<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CurrentDate implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $todayDate = date("Y-m-d");

        return $value >= $todayDate;
        
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'le Numéro de telephone et incorrect!';
    }
}
