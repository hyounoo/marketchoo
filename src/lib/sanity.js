import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from "next-sanity";

import { sanityConfig } from './config'


if (!sanityConfig.projectId) {
  throw Error("The Project ID is not set. Check your environment variables.");
}
if (!sanityConfig.dataset) {
  throw Error("The dataset name is not set. Check your environment variables.");
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(sanityConfig).image(source);

export const imageBuilder = createImageUrlBuilder(sanityConfig)

export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max')

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...sanityConfig,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(sanityConfig);
// Set up a preview client with serverless authentication for drafts

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;
