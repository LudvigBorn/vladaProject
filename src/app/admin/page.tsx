import { getContent } from "@/lib/content";
import { AdminEditor } from "@/components/admin/AdminEditor";

export default async function AdminPage() {
  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
