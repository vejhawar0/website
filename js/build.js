import { render_content } from './posts.js';
import { readdir, writeFile, mkdir } from 'fs/promises';

async function build_pages(path)
{ 
    try
    {
        console.log(`In directory ${path}`);
        const relative_path = "." + path;
        const files = await readdir(relative_path, { withFileTypes: true });
        for (const file of files) 
        {
            try
            {

            if (!file.name.endsWith("README.md") && file.name.endsWith(".md"))
                await create_file(path, file.name);

            else if (!file.name.endsWith("js") && !file.name.endsWith("build") && !file.name.startsWith(".") && file.isDirectory())
            {
                const subdirectory = "./build" + path + file.name;
               
                console.log(`Creating directory ${subdirectory}`);

                await mkdir(subdirectory, { recursive: true });

                console.log(`Created directory ${subdirectory}`);
                await build_pages(path + file.name + "/");
            }


            }

            catch (error)
            {
                console.error(`Had trouble with ${file.name}`);
            }
        }
    }
    catch (error) 
    {
	    console.error(`Could not read the directory ${relative_path}`);
    }
}

async function create_file(path, filename)
{
    try
    {
        const relative_path_to_file = "." + path + filename;
        const { metadata, parsed_html } = await render_content(relative_path_to_file);
        const slug = metadata.slug;
    
        console.log(`Rendered post ${relative_path_to_file}`);

        const output_path = "./build" + path + slug + ".html";
        console.log(`Attempting to write file to ${output_path}`);
        await writeFile(output_path, parsed_html);
    }
    catch (error)
    {
        console.error(`Trouble building path ${path + filename}`, error);
    }
}

async function build_site()
{
    try 
    {
        await mkdir("./build", { recursive: true });
        await build_pages("/");
    }

    catch (error)
    {
        console.error(`Trouble in building site: ${error}`);
    }
}

build_site();
