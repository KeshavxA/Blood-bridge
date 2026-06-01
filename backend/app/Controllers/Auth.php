<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use App\Models\HospitalModel;
use App\Models\ReceiverModel;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function registerHospital()
    {
        $rules = [
            'email'    => 'required|valid_email|is_unique[users.email]',
            'password' => 'required|min_length[6]',
            'name'     => 'required',
            'address'  => 'required',
            'phone'    => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = \Config\Database::connect();
        $db->transStart();

        $userModel = new UserModel();
        $userId = $userModel->insert([
            'email'    => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
            'role'     => 'hospital'
        ]);

        $hospitalModel = new HospitalModel();
        $hospitalModel->insert([
            'user_id' => $userId,
            'name'    => $this->request->getVar('name'),
            'address' => $this->request->getVar('address'),
            'phone'   => $this->request->getVar('phone')
        ]);

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->failServerError('Failed to register hospital');
        }

        return $this->respondCreated(['message' => 'Hospital registered successfully', 'user_id' => $userId]);
    }

    public function registerReceiver()
    {
        $rules = [
            'email'       => 'required|valid_email|is_unique[users.email]',
            'password'    => 'required|min_length[6]',
            'full_name'   => 'required',
            'phone'       => 'required',
            'blood_group' => 'required|in_list[A+,A-,B+,B-,AB+,AB-,O+,O-]'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $db = \Config\Database::connect();
        $db->transStart();

        $userModel = new UserModel();
        $userId = $userModel->insert([
            'email'    => $this->request->getVar('email'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
            'role'     => 'receiver'
        ]);

        $receiverModel = new ReceiverModel();
        $receiverModel->insert([
            'user_id'     => $userId,
            'full_name'   => $this->request->getVar('full_name'),
            'phone'       => $this->request->getVar('phone'),
            'blood_group' => $this->request->getVar('blood_group')
        ]);

        $db->transComplete();

        if ($db->transStatus() === false) {
            return $this->failServerError('Failed to register receiver');
        }

        return $this->respondCreated(['message' => 'Receiver registered successfully', 'user_id' => $userId]);
    }

    public function login()
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $userModel = new UserModel();
        $user = $userModel->where('email', $this->request->getVar('email'))->first();

        if (!$user || !password_verify($this->request->getVar('password'), $user['password'])) {
            return $this->failUnauthorized('Invalid credentials');
        }

        $profileId = null;
        if ($user['role'] === 'hospital') {
            $hospitalModel = new HospitalModel();
            $hospital = $hospitalModel->where('user_id', $user['id'])->first();
            $profileId = $hospital ? $hospital['id'] : null;
        } else if ($user['role'] === 'receiver') {
            $receiverModel = new ReceiverModel();
            $receiver = $receiverModel->where('user_id', $user['id'])->first();
            $profileId = $receiver ? $receiver['id'] : null;
        }

        session()->set([
            'user_id'    => $user['id'],
            'role'       => $user['role'],
            'profile_id' => $profileId,
            'logged_in'  => true
        ]);

        return $this->respond(['message' => 'Logged in successfully', 'role' => $user['role'], 'profile_id' => $profileId]);
    }

    public function logout()
    {
        session()->destroy();
        return $this->respond(['message' => 'Logged out successfully']);
    }

    public function me()
    {
        if (!session()->get('logged_in') || !session()->get('user_id')) {
            return $this->respond(['authenticated' => false, 'user' => null, 'profile' => null], 200);
        }

        $userModel = new UserModel();
        $user = $userModel->find(session()->get('user_id'));
        unset($user['password']);

        $profile = null;
        if ($user['role'] === 'hospital') {
            $hospitalModel = new HospitalModel();
            $profile = $hospitalModel->where('user_id', $user['id'])->first();
        } else if ($user['role'] === 'receiver') {
            $receiverModel = new ReceiverModel();
            $profile = $receiverModel->where('user_id', $user['id'])->first();
        }

        return $this->respond(['user' => $user, 'profile' => $profile]);
    }
}
