import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Head, usePage } from '@inertiajs/react';
import { FileText } from 'lucide-react';

type Props = {
    postCount: number;
};

export default function Dashboard() {
    const { postCount } = usePage<Props>().props;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 bg-white/80 p-6 shadow-sm dark:border-sidebar-border dark:bg-slate-950/80">
                        <div className="flex h-full flex-col justify-between gap-4">
                            <div className="flex items-center justify-between">
                                <div className="rounded-2xl bg-primary/10 p-3 text-primary dark:bg-primary/20 dark:text-primary-foreground">
                                    <FileText className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total posts
                                </p>
                                <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
                                    {postCount}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
