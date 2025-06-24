// src/utils/sanityClient.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanity = createClient({
  projectId: 'skp6ivit', // ganti sesuai project ID kamu
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-06-01',
});

const builder = imageUrlBuilder(sanity);

export function urlFor(source) {
  return builder.image(source);
}
