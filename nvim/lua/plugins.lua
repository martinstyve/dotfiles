local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- plugins
require("lazy").setup({
    -- OneDark color theme
    {
       "olimorris/onedarkpro.nvim",
       config = function()
	       require("onedarkpro").setup({
			theme = "onedark",
			styles = {
				-- comments = "italic",
				keywords = "bold",
				functions = "bold",
			},
			options = {
				cursorline = true,
				transparency = true,
			},
	       })
	       require("onedarkpro").load()
	end,
    },
    -- File explorer
    {
        "nvim-tree/nvim-tree.lua",
        requires = { "nvim-tree/nvim-web-devicons" },
        config = function()
            require("nvim-tree").setup {}

	vim.keymap.set("n", "<C-n>", ":NvimTreeToggle<CR>", { 
		noremap = true, 
		silent = true 
	})
        end,
    },
    -- language support parser (LSP)?
    {
        "nvim-treesitter/nvim-treesitter",
        build = ":TSUpdate",
        config = function()
            require("nvim-treesitter.configs").setup({
                ensure_installed = { "lua",
				     "python",
				     "java",
				     "javascript",
				     "typescript",
				     "c",
				     "sql",
				     "haskell"
		},
                highlight = {
                    enable = true,
                },
            })
        end,
    },
    -- Autocompletion
    {
        "hrsh7th/nvim-cmp",
        dependencies = {
            "hrsh7th/cmp-nvim-lsp",    -- LSP source for nvim-cmp
            "hrsh7th/cmp-buffer",      -- Buffer completions
            "hrsh7th/cmp-path",        -- File path completions
            "hrsh7th/cmp-cmdline",     -- Command-line completions
            "L3MON4D3/LuaSnip",        -- Snippet engine
            "saadparwaiz1/cmp_luasnip", -- Snippet completions
        },
    },
    -- LSP and Mason
    {
        "neovim/nvim-lspconfig",  -- LSP config
        dependencies = {
            "williamboman/mason.nvim",          -- LSP server installer
            "williamboman/mason-lspconfig.nvim", -- Mason integration 
        },
    },
    -- indentation markers
    {
        "Yggdroot/indentLine", 
        config = function()
            vim.g.indentLine_char = "│" 
            vim.g.indentLine_enabled = 1 
            vim.g.indentLine_fileTypeExclude = {"help", "packer", "NvimTree"}

            vim.g.indentLine_useColoredIndentation = 0 
            vim.g.indentLine_showFirstIndentLevel = 1 
            vim.g.indentLine_buftypeExclude = {"terminal", "nofile"}
            vim.g.indentLine_showFolded = 1 
	end,
    },
})

