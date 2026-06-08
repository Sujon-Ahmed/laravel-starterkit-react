<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $posts = Post::with('user')
            ->when($search, function ($query, $search) {
                $query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('content', 'LIKE', "%{$search}%");
            })
            ->latest()
            ->get();

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('posts/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'user_id' => auth()->id(),
            'is_published' => true,
        ]);
          
        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Post created successfully.'),
        ]);

        return Inertia::location(route('posts.index'));
    }

    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        if ($request->has('is_published') && ! $request->has('title')) {
            $request->validate([
                'is_published' => 'required|boolean',
            ]);

            $post->update([
                'is_published' => $request->is_published,
            ]);

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => __('Post status updated successfully.'),
            ]);

            return redirect()->route('posts.index');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Post updated successfully.'),
        ]);

        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }
}
