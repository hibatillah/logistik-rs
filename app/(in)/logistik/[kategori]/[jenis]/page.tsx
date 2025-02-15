export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const jenis = (await params).slug

  return <div>{jenis}</div>
}