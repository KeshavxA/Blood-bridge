<?php

namespace App\Models;

use CodeIgniter\Model;

class RequestModel extends Model
{
    protected $table = 'blood_requests';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $allowedFields = ['receiver_id', 'blood_sample_id', 'status', 'requested_at'];
    protected $useTimestamps = false;
}
