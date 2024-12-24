-- config lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- Bruk stable-versjonen
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

-- plugins
require("plugins")

-- tab strl 2
vim.opt.tabstop = 2  
vim.opt.shiftwidth = 2 
vim.opt.expandtab = true
vim.opt.showmode = false
vim.opt.undofile = true
vim.opt.updatetime = 250
vim.opt.splitright = true

vim.opt.list = true
vim.opt.listchars = { tab = '» ', trail = '·', nbsp = '␣' }

vim.opt.scrolloff = 10

vim.o.number = true
vim.o.colorcolumn = "80"
vim.o.showtabline = 2
vim.o.cursorline = true
vim.o.termguicolors = true
vim.o.backup = false
vim.o.writebackup = false
vim.o.swapfile = false
vim.o.emoji = false
