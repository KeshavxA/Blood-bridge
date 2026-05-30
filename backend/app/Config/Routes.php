<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', function($routes) {
    
    $routes->post('auth/register-hospital', 'Auth::registerHospital');
    $routes->post('auth/register-receiver', 'Auth::registerReceiver');
    $routes->post('auth/login', 'Auth::login');
    
    $routes->post('auth/logout', 'Auth::logout', ['filter' => 'auth']);
    $routes->get('auth/me', 'Auth::me', ['filter' => 'auth']);

    $routes->get('blood-samples', 'BloodSamples::index'); // Public
    $routes->post('blood-samples', 'BloodSamples::create', ['filter' => 'auth:hospital']);
    $routes->delete('blood-samples/(:num)', 'BloodSamples::delete/$1', ['filter' => 'auth:hospital']);

 
    $routes->post('requests', 'Requests::create', ['filter' => 'auth:receiver']);
    $routes->get('requests/hospital', 'Requests::hospital', ['filter' => 'auth:hospital']);
    $routes->get('requests/receiver', 'Requests::receiver', ['filter' => 'auth:receiver']);
});
