When running *qrs-mime* by default the list of Mime-types defined in the file `./config/mime-types.txt`

You can either modify this file to meet your custom needs or point to your very own definition of Mime-types by using the parameter `--file`

Each line of such a file defines a Mime-type to add, e.g.: 

```bash
md;text/x-markdown;;false
```

In every line four settings need to be made

1. **File-extension** (`md` in the example above)
2. The official **Mime-type** (`text/x-markdown` in the example above)
3. **Additional headers** (`blank` in the example above; leave blank if your not 100% sure how to use that)
4. Whether the given Mime-Type is **binary** or not (`false` in the example above)





