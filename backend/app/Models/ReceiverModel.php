<?php

namespace App\Models;

use CodeIgniter\Model;

class ReceiverModel extends Model
{
    protected $table = 'receivers';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $allowedFields = ['user_id', 'full_name', 'phone', 'blood_group'];
    protected $useTimestamps = false;
}
