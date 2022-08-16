import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeArticleFields {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  coverImage: Contentful.Asset;
  content: CFRichTextTypes.Block | CFRichTextTypes.Inline;
}

export type TypeArticle = Contentful.Entry<TypeArticleFields>;

export interface TypeGroupTripFields {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  dates: Contentful.EntryFields.Symbol;
  startDate: Contentful.EntryFields.Date;
  initialDescription: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  plainDescription: Contentful.EntryFields.Text;
  itinerary: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  closingDescription: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  packageDetails: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  packageNames: Contentful.EntryFields.Symbol[];
  packagePrices: Contentful.EntryFields.Symbol[];
  deposit: Contentful.EntryFields.Integer;
  images: Contentful.Asset[];
  thumbImg: Contentful.Asset;
}

export type TypeGroupTrip = Contentful.Entry<TypeGroupTripFields>;
