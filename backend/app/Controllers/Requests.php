<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\RequestModel;
use App\Models\BloodSampleModel;
use App\Models\ReceiverModel;

class Requests extends ResourceController
{
    protected $format = 'json';

    public function __construct()
    {
        helper('blood');
    }

    public function create()
    {
        $rules = [
            'blood_sample_id' => 'required|integer'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $receiverId = session()->get('profile_id');
        if (!$receiverId) {
            return $this->failUnauthorized('Receiver profile not found');
        }

        $bloodSampleId = $this->request->getVar('blood_sample_id');

        $sampleModel = new BloodSampleModel();
        $sample = $sampleModel->find($bloodSampleId);

        if (!$sample) {
            return $this->failNotFound('Blood sample not found');
        }

        if ($sample['status'] !== 'available') {
            return $this->fail('Blood sample is no longer available', 400);
        }

        $receiverModel = new ReceiverModel();
        $receiver = $receiverModel->find($receiverId);

        // Check eligibility
        if (!is_blood_compatible($sample['blood_group'], $receiver['blood_group'])) {
            return $this->fail('You are not eligible to receive this blood group', 400);
        }

        $requestModel = new RequestModel();
        
        // Prevent duplicate
        $existing = $requestModel->where('receiver_id', $receiverId)
                                 ->where('blood_sample_id', $bloodSampleId)
                                 ->first();
                                 
        if ($existing) {
            return $this->failResourceExists('You have already requested this sample');
        }

        $requestModel->insert([
            'receiver_id'     => $receiverId,
            'blood_sample_id' => $bloodSampleId,
            'status'          => 'pending'
        ]);

        return $this->respondCreated(['message' => 'Request submitted successfully']);
    }

    public function hospital()
    {
        $hospitalId = session()->get('profile_id');
        if (!$hospitalId) {
            return $this->failUnauthorized('Hospital profile not found');
        }

        $db = \Config\Database::connect();
        $builder = $db->table('blood_requests');
        $builder->select('blood_requests.*, blood_samples.blood_group as sample_blood_group, blood_samples.units_available, receivers.full_name as receiver_name, receivers.phone as receiver_phone, receivers.blood_group as receiver_blood_group');
        $builder->join('blood_samples', 'blood_samples.id = blood_requests.blood_sample_id');
        $builder->join('receivers', 'receivers.id = blood_requests.receiver_id');
        $builder->where('blood_samples.hospital_id', $hospitalId);
        $query = $builder->get();
        
        return $this->respond($query->getResultArray());
    }

    public function receiver()
    {
        $receiverId = session()->get('profile_id');
        if (!$receiverId) {
            return $this->failUnauthorized('Receiver profile not found');
        }

        $db = \Config\Database::connect();
        $builder = $db->table('blood_requests');
        $builder->select('blood_requests.*, blood_samples.blood_group as sample_blood_group, hospitals.name as hospital_name, hospitals.phone as hospital_phone');
        $builder->join('blood_samples', 'blood_samples.id = blood_requests.blood_sample_id');
        $builder->join('hospitals', 'hospitals.id = blood_samples.hospital_id');
        $builder->where('blood_requests.receiver_id', $receiverId);
        $query = $builder->get();
        
        return $this->respond($query->getResultArray());
    }
}
