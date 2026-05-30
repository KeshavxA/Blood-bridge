<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BloodSampleModel;

class BloodSamples extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('blood_samples');
        $builder->select('blood_samples.*, hospitals.name as hospital_name, hospitals.address, hospitals.phone');
        $builder->join('hospitals', 'hospitals.id = blood_samples.hospital_id');
        $builder->where('blood_samples.status', 'available');
        $query = $builder->get();
        $samples = $query->getResultArray();

        return $this->respond($samples);
    }

    public function create()
    {
        $rules = [
            'blood_group'     => 'required|in_list[A+,A-,B+,B-,AB+,AB-,O+,O-]',
            'units_available' => 'required|integer|greater_than[0]',
            'collection_date' => 'required|valid_date'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $hospitalId = session()->get('profile_id');
        if (!$hospitalId) {
            return $this->failUnauthorized('Hospital profile not found');
        }

        $model = new BloodSampleModel();
        $data = [
            'hospital_id'     => $hospitalId,
            'blood_group'     => $this->request->getVar('blood_group'),
            'units_available' => $this->request->getVar('units_available'),
            'collection_date' => $this->request->getVar('collection_date'),
            'status'          => 'available'
        ];

        $model->insert($data);
        return $this->respondCreated(['message' => 'Blood sample added successfully']);
    }

    public function delete($id = null)
    {
        if (!$id) {
            return $this->failNotFound('Sample ID required');
        }

        $hospitalId = session()->get('profile_id');
        $model = new BloodSampleModel();
        $sample = $model->find($id);

        if (!$sample) {
            return $this->failNotFound('Sample not found');
        }

        if ($sample['hospital_id'] != $hospitalId) {
            return $this->failForbidden('You can only delete your own samples');
        }

        $model->delete($id);
        return $this->respondDeleted(['message' => 'Sample removed successfully']);
    }
}
