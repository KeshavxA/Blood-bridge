<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Check if user is logged in
        if (!session()->get('user_id')) {
            $response = service('response');
            $response->setStatusCode(401);
            $response->setJSON(['error' => 'Unauthorized. Please log in.']);
            return $response;
        }
        
        // If roles are specified in arguments, check if user has one of the roles
        if ($arguments && !empty($arguments)) {
            $userRole = session()->get('role');
            if (!in_array($userRole, $arguments)) {
                $response = service('response');
                $response->setStatusCode(403);
                $response->setJSON(['error' => 'Forbidden. You do not have permission to access this resource.']);
                return $response;
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do nothing here
    }
}
