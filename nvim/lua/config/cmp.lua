local cmp = require("cmp")

cmp.setup({
    snippet = {
        expand = function(args)
            require("luasnip").lsp_expand(args.body) -- Snippet engine
        end,
    },
    mapping = cmp.mapping.preset.insert({
        ["<C-b>"] = cmp.mapping.scroll_docs(-4),
        ["<C-f>"] = cmp.mapping.scroll_docs(4),
        ["<C-Space>"] = cmp.mapping.complete(),
        ["<C-e>"] = cmp.mapping.abort(),
        ["<CR>"] = cmp.mapping.confirm({ select = true }), -- Confirm selection
    }),
    sources = cmp.config.sources({
        { name = "nvim_lsp" },  -- LSP completions
        { name = "luasnip" },   -- Snippet completions
    }, {
        { name = "buffer" },    -- Buffer completions
        { name = "path" },      -- File path completions
    }),
})

-- Command-line completion
cmp.setup.cmdline(":", {
    mapping = cmp.mapping.preset.cmdline(),
    sources = {
        { name = "path" },
        { name = "cmdline" },
    },
})

