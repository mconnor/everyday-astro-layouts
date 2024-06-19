import { z, reference, type SchemaContext } from 'astro:content';

const urlSchema = z.string().url();
const urlSchemaOptional = urlSchema.optional();
const strSC = z.string();
const strSCOptional = strSC.optional();
const emailSchema = z.string().email();
const emailSchemaOptional = emailSchema.optional();

const imageSrcSchema = z.object({ src: urlSchema, alt: strSC });

const myDateSchema = z.date({
  required_error: 'Please select a date and time',
  invalid_type_error: "That's not a date!",
});

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    description: z.string().optional(),
  });

export const blogSchema = z.object({
  title: strSC,
  pubDate: myDateSchema,
  description: strSC,
  author: reference('authors'),
  // relatedPosts: z.array(reference('blog')).optional(),
  draft: z.boolean().optional(),
  tags: z.array(strSC).optional(),
  cover: imageSrcSchema,
});

export const authorSchema = z.object({
  id: strSC,
  name: strSC.default('Anonymous'),
  email: emailSchemaOptional,
  portfolio: z.string().url().optional(),
  bio: strSCOptional,
});

export type AurthorSchemaType = z.infer<typeof authorSchema>;
export type BlogSchemaType = z.infer<typeof blogSchema>;
