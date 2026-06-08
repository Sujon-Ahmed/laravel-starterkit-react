import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { Head, useForm } from '@inertiajs/react';

export default function EditPost({ post }: any) {
    const { data, setData, put, processing, errors, reset } = useForm({
        title: post.title,
        content: post.content,
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/posts/${post.id}`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Edit Post" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="mx-auto w-full max-w-7xl">
                    <CardHeader>
                        <CardTitle>Edit Post</CardTitle>
                        <CardDescription>
                            Update the details of your post.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Form fields for creating a post will go here */}
                        <form
                            className="space-y-6"
                            method="PUT"
                            action={`/posts/${post.id}`}
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Title
                                </label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Content
                                </label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    rows={4}
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/50 sm:text-sm"
                                ></Textarea>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                            >
                                {processing ? (
                                    <Spinner className="mr-2 h-4 w-4" />
                                ) : null}
                                {processing ? 'Updating...' : 'Update Post'}
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

EditPost.layout = {
    breadcrumbs: [
        {
            title: 'Edit Post',
            href: '/posts/edit',
        },
    ],
};
