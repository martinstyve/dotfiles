-- remove warning for undefined vim object
---@diagnostic disable: undefined-global

-- config lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- stable-version
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- plugins
require("plugins")
-- LSP
require("config.cmp")
require("config.lsp")

-- global 2 space tab
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.expandtab = true

-- Autocommand to enforce 2 space tab for all files
vim.api.nvim_create_autocmd("BufEnter", {
  pattern = "*",
  callback = function()
    vim.opt_local.tabstop = 2
    vim.opt_local.shiftwidth = 2
    vim.opt_local.expandtab = true
  end,
})

vim.opt.showmode = false
vim.opt.undofile = true
vim.opt.updatetime = 250
vim.opt.splitright = true

vim.opt.list = true
vim.opt.listchars = { tab = '» ', trail = '·', nbsp = '␣' }

vim.opt.scrolloff = 6

vim.opt.clipboard:append("unnamedplus") -- "+y to copy to clipboard

vim.opt.number = true
vim.opt.colorcolumn = "80"
vim.opt.showtabline = 2
vim.opt.cursorline = true
vim.opt.termguicolors = true
vim.opt.backup = false
vim.opt.writebackup = false
vim.opt.swapfile = false
vim.opt.emoji = false

-- adjusts errors/warning to be more subtle
vim.diagnostic.config({
  virtual_text = {
    spacing = 2, -- distance from code
    severity = { min = vim.diagnostic.severity.WARN }, -- remove info warning
    prefix = "•", -- Dot as subtle warning symbol
    source = "if_many",
  },
  float = { border = "none", source = "always", focusable = false, },
})

