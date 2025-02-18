export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const id = (await params).slug

  return <div>{id}</div>
}