
# changes directory to Documents on startup
export START="/Users/martin/Documents"
if [[ $PWD == $HOME ]]; then
    cd $START
fi

# Define color variables
COLOR_USER_HOST="\[\033[38;5;46m\]"   # Green for user and host
COLOR_PATH="\[\033[38;5;27m\]"        # Blue for the path
COLOR_PROMPT="\[\033[38;5;46m\]"      # Green for the prompt symbol
COLOR_RESET="\[\033[0m\]"             # Reset to default

# Updated prompt without user
PS1="${COLOR_PATH}\w ${COLOR_PROMPT}\$ ${COLOR_RESET}"

# Old prompt with user
# PS1="${COLOR_USER_HOST}\u@\h ${COLOR_PATH}\w ${COLOR_PROMPT}\$ ${COLOR_RESET}"

eval "$(/opt/homebrew/bin/brew shellenv)"

export PATH="$HOME/.local/bin:$PATH"
export PATH="/usr/local/opt/cabal-install/bin:$PATH"


[[ -f ~/.bashrc ]] && . ~/.bashrc # ghcup-env

# saves empty file at home folder
# macOS will then stop showing login information at boot
touch ~/.hushlogin

# deactivates message that zsh er standard shell
export BASH_SILENCE_DEPRECATION_WARNING=1

# custom login ascii art
echo -e "

                   /----|       .         .
     .            /     [   .        .         .
            ______|---- _|__     .        .
   .     _--    --\_<\_//   \-----           .
        _  _--___   \__/     ___  -----_ **     *
   *  _- _-      --_         /  [ ----__  --_  *
   */__-      .    [           _[  *** --_  [*
     [*/ .          __[/-----__/   [**     [*/
           .     /--  /            /
        .        /   /   /[----___/        .
                /   /*[  !   /==/              .
     .         /   /==[   |/==/      .
             _/   /=/ | _ |=/   .               .
            /_   //  / _ _//              .
    .       [ '//    |__//    .    .            .
           /==/  .  /==/                .
         /==/     /==/                       .
       /==/     /==/       .       .    .
    _/==/    _/==/            .
    [|*      [|*                  

"


