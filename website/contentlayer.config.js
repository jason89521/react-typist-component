import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeHighlight from 'rehype-highlight';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'enum',
      options: ['react-typist-component'],
      description: `The package's name`,
      required: true,
    },
    title: {
      type: 'string',
      description: 'The title of the document',
      required: true,
    },
    intro: {
      type: 'string',
      description: 'The brief introduction of the document',
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: 'contents',
  documentTypes: [Doc],
  mdx: {
    rehypePlugins: [rehypeHighlight],
  },
});
