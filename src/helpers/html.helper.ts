import { minify } from 'html-minifier';
import serialize from 'serialize-javascript';

export default (
  head: Record<string, any>,
  content: string,
  extractor: Record<string, any>,
  initialState: Record<string, unknown>
): any => {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>

      <body>
        <div id="react-view">${content}</div>

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.INITIAL_STATE=${serialize(initialState)};
        </script>

        ${extractor.getScriptTags()}
        ${head.script.toString()}
      </body>
    </html>
  `;

  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  };

  // @ts-ignore
  return global.DEV ? html : minify(html, minifyConfig);
};
