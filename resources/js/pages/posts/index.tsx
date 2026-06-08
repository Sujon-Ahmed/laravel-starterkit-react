import { useEffect, useRef, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Head, Link, router } from '@inertiajs/react';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Post({ posts, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                '/posts',
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="mx-auto w-full max-w-7xl">
                    <CardHeader className="flex flex-row flex-wrap items-center justify-between">
                        <div className="">
                            <CardTitle className="mb-3">Posts</CardTitle>
                            <div className="relative w-sm">
                                <Input
                                    type="search"
                                    placeholder="Search posts"
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                        </div>
                        <Link
                            href="/posts/create"
                            className="ml-auto flex items-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
                        >
                            <PlusCircle className="me-2 h-4 w-4" />
                            Add New
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        SL
                                    </TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post: any) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">
                                            {post.id}
                                        </TableCell>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.content}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={!!post.is_published}
                                                onCheckedChange={(checked) => {
                                                    router.patch(
                                                        `/posts/${post.id}`,
                                                        { is_published: checked },
                                                        { preserveScroll: true }
                                                    );
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="space-x-2 text-right">
                                            <Link
                                                href={`/posts/${post.id}/edit`}
                                                className="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/posts/${post.id}`}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => {
                                                    if (
                                                        !confirm(
                                                            'Are you sure you want to delete this post?',
                                                        )
                                                    ) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className="cursor-pointer rounded-md bg-destructive px-3 py-2 text-sm text-white hover:bg-destructive/90"
                                            >
                                                Delete
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Post.layout = {
    breadcrumbs: [
        {
            title: 'Posts',
            href: '/posts',
        },
    ],
};
