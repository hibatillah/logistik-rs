import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pathnameToTitle(path: string, separator: string = "-") {
  const title = path.split(separator).join(" ")

  const regexStartByText = /^[a-zA-Z]/
  const isText = regexStartByText.test(title)

  return isText ? title : "Detail"
}

export function titleToPathname(title: string, separator: string = "-") {
  return title.split(" ").join(separator).toLowerCase()
}

export function joinPath(paths: string[], index: number) {
  return "/" + paths.slice(0, index + 1).join("/")
}

export type BreadcrumbItem = {
  title: string
  link: string
}

export function toBreadcrumbItem(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean)
  return paths.map((item, key) => ({
    title: pathnameToTitle(item),
    link: joinPath(paths, key),
  }))
}
