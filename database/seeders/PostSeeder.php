<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'First Post',
                'slug' => 'first-post',
                'content' => 'This is the content of the first post.',
                'user_id' => 1,
                'is_published' => true,
            ],
            [
                'title' => 'Second Post',
                'slug' => 'second-post',
                'content' => 'This is the content of the second post.',
                'user_id' => 1,
                'is_published' => false,
            ],
            [
                'title' => 'Third Post',
                'slug' => 'third-post',
                'content' => 'This is the content of the third post.',
                'user_id' => 1,
                'is_published' => true,
            ],
            [
                'title' => 'Fourth Post',
                'slug' => 'fourth-post',
                'content' => 'This is the content of the fourth post.',
                'user_id' => 1,
                'is_published' => false,
            ],
            [
                'title' => 'Fifth Post',
                'slug' => 'fifth-post',
                'content' => 'This is the content of the fifth post.',
                'user_id' => 1,
                'is_published' => true,
            ],
        ];

        foreach ($posts as $post) {
            Post::create($post);
        }
    }
}
