import { marked } from 'marked';
import { readFile } from 'fs/promises';

export async function render_content(path)
{
    try
    {
	const content = await readFile(path, 'utf8');
	console.log(content);
	
	const parsed_html = marked.parse(content);
	return parsed_html;
    
    }
    catch (error) 
    {
	console.error(`Unable to read file ${path}`);
    }		
}

