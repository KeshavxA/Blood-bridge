<?php

namespace App\Models;

use CodeIgniter\Model;

class BloodSampleModel extends Model
{
    protected $table = 'blood_samples';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $allowedFields = ['hospital_id', 'blood_group', 'units_available', 'collection_date', 'status', 'created_at'];
    protected $useTimestamps = false;
}
