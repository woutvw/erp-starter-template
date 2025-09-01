<?php

use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    if (request()->is('api/*')) {
        abort(404);
    }

    return view('app');
});
