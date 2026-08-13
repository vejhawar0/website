import { marked } from 'marked';
import { readFile } from 'fs/promises';
import YAML from 'yaml';

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

// Takes in a string, containing the path of content being rendered. Returns html along with metadata of a file.
export async function render_content(path)
{
    try
    {
	    const content = await readFile(path, 'utf8');
	    console.log(content);

        const { metadata, remaining_content } = parse_post(content);
	
    	const parsed_html = marked.parse(remaining_content);
    	const result = { metadata, parsed_html };
        return result;
    }
    catch (error) 
    {
	    console.error(`Unable to read file ${path}`);
    }		
}

