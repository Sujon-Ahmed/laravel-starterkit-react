<?php

use App\Http\Controllers\PostController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'postCount' => Post::count(),
        ]);
    })->name('dashboard');
});

Route::resource('posts', PostController::class)->middleware(['auth', 'verified']);

require __DIR__.'/settings.php';
