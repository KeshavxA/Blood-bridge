<?php

/**
 * Checks if a donor blood group is compatible with a receiver blood group.
 *
 * @param string $donorGroup The blood group of the donor/sample
 * @param string $receiverGroup The blood group of the receiver/patient
 * @return bool True if compatible, false otherwise
 */
function is_blood_compatible(string $donorGroup, string $receiverGroup): bool
{
    $compatibilityMap = [
        'O-'  => ['O-'],
        'O+'  => ['O-', 'O+'],
        'A-'  => ['O-', 'A-'],
        'A+'  => ['O-', 'O+', 'A-', 'A+'],
        'B-'  => ['O-', 'B-'],
        'B+'  => ['O-', 'O+', 'B-', 'B+'],
        'AB-' => ['O-', 'A-', 'B-', 'AB-'],
        'AB+' => ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']
    ];

    if (!isset($compatibilityMap[$receiverGroup])) {
        return false;
    }

    return in_array($donorGroup, $compatibilityMap[$receiverGroup]);
}
