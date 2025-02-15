export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const kategori = (await params).slug

  return <div>{kategori}</div>
}