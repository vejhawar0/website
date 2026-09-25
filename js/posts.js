import { Marked } from 'marked';
import { readFile } from 'fs/promises';
import YAML from 'yaml';
import markedKatex from 'marked-katex-extension';

export function parse_post(content)
{
    const regex = /---([^]+?)---/; // Regex containing the pattern for frontmatter
    const match  = content.match(regex);
    
    if (!match) 
    {
        console.log("Could not detect front matter for file!");
        return {};
    }

    console.log("Detected frontmatter for file");

    const metadata_plain_text = match[1].trim();
    const remaining_content = content.slice(match[0].length);

    const metadata = YAML.parse(metadata_plain_text);

    return { metadata, remaining_content };
}

export async function instill_template(content, title, description)
{
    try
    {

    let template = await readFile("./html.template", 'utf8');

    template = template.replaceAll("$pagetitle$", title);
    template = template.replace("$body$", content);
    template = template.replace("$desc$", description);

    return template;
    }

    catch (error)
    {
        console.error(`Unable to instill template for ${title}`);
    }

}

// Takes in a string, containing the path of content being rendered. Returns html along with metadata of a file.
export async function render_content(path)
{
    try
    {
        const marked = new Marked();
        marked.use(markedKatex({
            throwOnError: false,
            output: 'htmlAndMathml'
        }));

	    const content = await readFile(path, 'utf8');
	    // console.log(content);

        const { metadata, remaining_content } = parse_post(content);
    
    	let parsed_html = marked.parse(remaining_content);
        parsed_html = await instill_template(parsed_html, metadata.title, metadata.description);
    	const result = { metadata, parsed_html };
        return result;
    }
    catch (error)   
    {
	    console.error(`Unable to read file ${path}`);
    }		
}

