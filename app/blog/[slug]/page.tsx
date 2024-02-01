import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == "blog" && slug.current == '${slug}']{
    "currentSlug": slug.current,
     title, 
     content, 
     titleImage
    }[0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block underline mt-6 text-3xl text-center text-primary font-semibold tracking-wide uppercase">
          Muhammad Shahzad Blog
        </span>
        <span className="mt-6 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src={urlFor(data.titleImage).url()}
          width={800}
          height={800}
          alt="Title Image"
          priority
          className="rounded-lg mt-8 border"
        />
      </div>
      <div className="mt-16 prose prose-blue prose-xl ml-80 mr-96 Light:prose-invert">
        <PortableText value={data.content}></PortableText>
      </div>
    </div>
  );
}
