import { render_content } from './posts.js';
import { readdir, writeFile } from 'fs/promises';

async function render_posts()
{
    const directory_path = '../posts/';
    
    try
    {
	const files = await readdir(directory_path);

        for (const file of files) {
	    const html = await render_content(directory_path + file);
            console.log(`Rendered post ${file}`);
	    const output_path = `../posts/${file.replace('.md', '.html')}.html`;
	    await writeFile(output_path, html);
	    console.log(html);
        }
    }
    catch (error) {
	console.error(`Could not read the directory ${error}`);
    }
}

render_posts();
