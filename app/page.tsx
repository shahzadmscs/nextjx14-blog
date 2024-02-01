import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogcard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const revalidate = 30;

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
    title, smallDescription, 
      "currentSlug": slug.current,
      titleImage
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogcard[] = await getData();
  // console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="Author"
            width={650}
            height={600}
            className="rounded-lg h-[300px] object-cover"
          />
          <CardContent className="mt-5 ">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm line-clamp-4 mt-2 text-gray-600">
              {post.smallDescription}
            </p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
