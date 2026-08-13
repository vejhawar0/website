import { render_content } from './posts.js';
import { readdir, writeFile, mkdir } from 'fs/promises';

async function render_posts()
{
    const directory_path = '../posts/';
    
    try
    {
	const files = await readdir(directory_path);

        for (const file of files) 
        {
	        const { metadata, parsed_html } = await render_content(directory_path + file);
            const slug = metadata.slug;
            const category = metadata.category;
            console.log(`Rendered post ${file}`);

            await mkdir(`../${category}/${slug}`, {recursive: true});
            console.log("Directory successfully established");

	        const output_path = `../${category}/${slug}/index.html`;
	        await writeFile(output_path, parsed_html);
        }
    }
    catch (error) {
	console.error(`Could not read the directory ${error}`);
    }
}

render_posts();
