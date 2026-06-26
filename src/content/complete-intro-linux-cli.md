# Complete Intro to Linux and the Command-Line

**Instructor:** Brian Holt | **Platform:** Frontend Masters

---

## History

Linux is a Unix-based operating system.

Unix is divided into multiple branches. This course focuses on the **BSD family** — which includes both Linux and macOS.

### Unix Philosophy

- Make each program do one thing well. To do a new job, build a new program rather than complicate old programs by adding new "features."
- Expect the output of one program to become the input of another, as yet unknown, program.
- Design and build software — even operating systems — to be tried early, ideally within weeks. Don't hesitate to throw away the clumsy parts and rebuild them.
- Use tools in preference to unskilled help to lighten a programming task.

---

## Linux

- Linux is **not** directly Unix — it is Unix-like.
- Linux is a **kernel** that manages the lowest level of things: file system, I/O, memory, scheduling, and processes.

### Distros (Distributions)

- Distros are wrappers around the Linux kernel with different capabilities: desktop experiences, programs, package managers, networking capabilities.
- Popular distros: **Red Hat**, **Ubuntu**, **CentOS**, **Kali**, and many more.
- Some distros are **downstream** of others — for example, Ubuntu is built on top of Debian.

### Why Linux?

- It's free.
- It runs on any device (Intel, AMD, Raspberry Pi, cars, fridges…).
- Huge, powerful community.
- Big companies run their entire backend infrastructure on Linux, saving millions of dollars.

---

## Multipass

Multipass lets you run Ubuntu VMs on your local machine for practice.

**Uninstall (macOS):**

```bash
sudo sh "/Library/Application Support/com.canonical.multipass/uninstall.sh"
```

---

## CLI Basics

The CLI operates as a **REPL** — Read, Evaluate, Print, Loop.

Linux is a **file system–oriented OS** — almost everything is represented as a file.

### Bash

**Bourne Again Shell (BASH)** — ~30 years old, maintained by the GNU Foundation.

| Symbol | Meaning |
|--------|---------|
| `/`    | Root directory |
| `~`    | Home directory |

### Essential Commands

| Command | Description |
|---------|-------------|
| `echo`  | Outputs whatever text is provided to it |
| `which` | Displays the full path to a program |
| `pwd`   | Print working directory |

`/bin` — the binary directory containing executable programs that can be run in Linux.

### Flags

```bash
pwd --help
```

- `.` (dot prefix) — creates a hidden file (e.g., `.gitignore`)
- Single dash `-` — shorthand flag (e.g., `-l`)
- Double dash `--` — longhand flag (e.g., `--help`)

**Common `ls` flags:**

```bash
ls -lsah   # long, size, all files, human-readable
```

### CLI Search & History

```bash
Ctrl + R   # reverse search through command history
!!         # re-run the exact last command
sudo !!    # re-run last command with sudo
```

`tail ~/.bash_history` — view recent command history (`tail` prints the last 10 lines by default).

### Signals and the Power of CTRL

`yes` — repeatedly outputs "y"; useful for piping into programs that ask for confirmation.

A **signal** is a construct in bash that lets you send a running program a message.

| Shortcut   | Action |
|------------|--------|
| `Ctrl + C` | Send SIGINT — interrupt / terminate |
| `Ctrl + Z` | Pause (suspend) the current process |
| `Ctrl + L` | Clear the screen |
| `Ctrl + K` | "Yank" (cut) everything after the cursor |
| `Ctrl + U` | "Yank" (cut) everything before the cursor |

> xkcd by Randall Munroe makes great command-line jokes.

---

## Interacting with Files

| Command | Description |
|---------|-------------|
| `less`  | Read large files (paginated) |
| `man`   | Open the manual for a command |
| `cat`   | Print file contents to stdout; best for small files |
| `tail`  | Print the last 10 lines of a file |
| `head`  | Print the first 10 lines of a file |

```bash
tail -n 3 <filename>      # print last 3 lines
tail -f <filename>        # follow / real-time output (great for logs)
```

### Creating & Moving Files

```bash
mkdir my-dir                        # create a directory
mkdir -p hi/my/name/is/neel        # create nested directories at once
touch file.txt                      # create file (or update modified time if it exists)
rm file.txt                         # remove a file
rm -r my-dir                        # remove a directory recursively
cp <source> <destination>           # copy a file
cp -R <src-dir> <dest-dir>         # copy a directory recursively
mv old-name.txt new-name.txt       # move or rename
```

### Archives with tar

```bash
tar -cf archive.tar file1 dir1         # create archive
tar -cfz archive.tar.gz file1 dir1    # create compressed archive
tar -xzf archive.tar.gz -C some-dir  # extract to a folder
```

---

## Wildcards & Brace Expansion

Brace expansion is processed by bash before the command runs.

```bash
touch file{1,2,3,4}.txt    # creates file1.txt, file2.txt, file3.txt, file4.txt
touch file{1..30}           # creates file1 through file30
echo {a..z}{1..5}           # prints all permutations (a1 a2 … z5)
```

### Glob Patterns (Wildcards)

```bash
ls file-*     # match anything starting with "file-"
ls file?.txt  # ? matches exactly one character
```

- `*` — matches any number of characters (anywhere in the string)
- `?` — matches exactly one character
- `\` — escape character (use the literal next character)

---

## Output & Input Streams

### Redirecting stdout / stderr

| Operator | Meaning |
|----------|---------|
| `1>`     | Redirect stdout (overwrite) |
| `1>>`    | Redirect stdout (append) |
| `2>`     | Redirect stderr (overwrite) |
| `2>>`    | Redirect stderr (append) |
| `&>`     | Redirect both stdout and stderr (overwrite) |
| `&>>`    | Redirect both stdout and stderr (append) |

```bash
/dev/null   # the "black hole" — silently discard output
```

### Redirecting stdin

```bash
cat < new-file.txt
grep "error" < logfile.txt
```

---

## Pipes

The pipe `|` sends the stdout of one command into the stdin of the next.

```bash
cat ls.txt | grep "error.txt"
ps aux | grep node
```

```bash
yes > /dev/null &           # run `yes` in the background (& sends to background)
yes | rm -i file*           # pipe `yes` into rm so it auto-confirms every prompt
```

> Note: `echo` does **not** read from stdin — it only accepts arguments.

---

## Users & Permissions

Linux is a **multi-user operating system**.

```bash
cat /etc/passwd    # list all users
```

### Principle of Least Privilege

Grant only the minimum permissions needed.

```bash
sudo useradd neel              # create a new user
sudo passwd neel               # set a password for the user
su neel                        # switch to another user
```

### Groups

```bash
sudo usermod -aG sudo neel     # add user `neel` to the `sudo` group
```

### Ownership

```bash
sudo chown neel:neel /hello    # change owner (user:group) of a file or directory
```

### chmod — File Permissions

```bash
sudo chmod u=rw,g=rw,o=rw hello.txt   # set permissions symbolically
sudo chmod 777 file.txt                 # set permissions with octal notation
sudo chmod +x my-script.sh             # add execute permission for all users
sudo chmod -x my-script.sh             # remove execute permission
```

---

## Environment Variables

```bash
printenv                          # list all environment variables
MY_VAR="hello"                    # set variable for current session only
vi /etc/environment               # set global variables for all users
```

- `.bashrc` — runs every time a new bash session starts (interactive non-login shell)
- `.bash_profile` — runs only at the first interactive login shell

```bash
# .bash_profile typically sources .bashrc:
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

---

## Processes

```bash
ps                              # list current user's processes
ps aux                          # list all processes across all users
kill -9 <PID>                   # forcefully kill a process (SIGKILL)
kill -SIGKILL <PID>             # same as above
```

### Background Jobs

```bash
sleep 1000          # start a long-running process
Ctrl + Z            # suspend (pause) the current foreground process
jobs                # list all background/suspended jobs
fg 1                # bring job #1 back to the foreground
command &           # run a command directly in the background
```

---

## Exit Codes

Every command returns an exit code. `0` means success; anything else is a failure.

```bash
date
echo $?    # print the exit code of the last command
```

| Code | Meaning |
|------|---------|
| `0`  | Success |
| `1`  | General error |
| `2`  | Bash syntax/usage error |
| `126`| File is not executable |
| `127`| Command not found |
| `130`| Terminated by Ctrl+C |
| `137`| Killed by SIGKILL |
| `255`| Exit code out of range |

### Process Operators

```bash
touch status.txt && date >> status.txt && uptime >> status.txt
```

| Operator | Meaning |
|----------|---------|
| `&&`     | Run next command only if the previous succeeded |
| `\|\|`   | Run next command only if the previous failed |
| `;`      | Run next command regardless of exit code |

---

## Subcommands

A subcommand runs a separate command and inserts its stdout output into the parent command at that position.

```bash
echo "I think $(whoami) is a really cool user"
echo "Today is $(date)"
```

- `` `command` `` and `$(command)` are equivalent — always prefer `$()`.

> A subcommand executes a separate command and returns whatever that command outputs to standard out. The returned value is then inserted into the parent command at that position.

---

## SSH

SSH lets you connect securely from one system to another.

```bash
sudo useradd -s /bin/bash -m -g ubuntu neel    # create a user with bash shell and home dir
ssh-keygen -t rsa                               # generate an RSA key pair
```

### SFTP — Secure File Transfer

```bash
sftp neel@192.168.2.23

# Inside sftp:
put file1.txt                    # copy local file to remote
put file1.txt newname.txt        # copy and rename on remote
get file1.txt                    # copy file from remote to local
lcd ~/local-dir                  # change local directory (l prefix = local)
cd /remote-dir                   # change remote directory
```

### wget — Download from the Internet

```bash
wget <url>    # download a file from a URL
```

- `wget` is the older tool; supports recursive downloads.

---

## curl

`curl` supports stdin and stdout, making it composable with other programs.

```bash
# Download a file
curl <url> > game.sh

# Test an API endpoint
curl -X POST -H "Content-Type: application/json" -d '{}' <url>
```

`curl` is the modern go-to for testing API endpoints and making HTTP requests from the terminal.

---

## Package Management (apt)

`apt` — Advanced Packaging Tool (Ubuntu/Debian).

```bash
sudo apt update                # refresh package index
sudo apt install <package>     # install a package
sudo apt remove <package>      # remove a package
sudo apt autoremove            # remove unused dependencies
sudo apt upgrade               # upgrade installed packages
sudo apt full-upgrade          # upgrade + handle dependency changes
apt search <package>           # search for a package
apt list                       # list installed packages
apt list --upgradable          # list packages with available upgrades
```

- `apt-get` is the older version; `apt` is the modern replacement.
- `snap` is an alternative packaging system.
- Anything ending in `d` (e.g., `sshd`, `nginx`) is a **daemon** — a background service.

---

## Shell Scripts

Shell scripts have the `.sh` extension.

**Three ways to run a script:**

```bash
source my-script.sh    # run in the current shell session (variables persist)
. my-script.sh         # same as source
bash my-script.sh      # run in a new bash subshell
```

### Hashbang (Shebang)

The first line of a script tells the OS which interpreter to use.

```bash
#!/bin/bash
```

```bash
which bash    # find the full path to bash for use in the hashbang
```

**Run scripts without a path prefix** by adding the script's directory to your PATH:

```bash
# In ~/.zshrc or ~/.bashrc:
export PATH="~/my-scripts:$PATH"
```

### Variables

```bash
DESTINATION=~/temp        # assign (no spaces around =)
mkdir -p $DESTINATION     # use with $
cd $DESTINATION

${VARIABLE}               # explicit variable resolution (use when next to other text)
```

`mkdir -p` — create the directory if it doesn't exist; don't fail if it already does.

### Arguments

```bash
$1    # first argument passed to the script
$2    # second argument, etc.
```

```bash
read -p "Enter a file prefix: " FILE_PREFIX    # prompt user for input
```

### Conditionals

```bash
if [ -z $DESTINATION ]; then
    echo "No path provided, defaulting to ~/temp"
    DESTINATION=temp
fi
```

**Test flags (`man test`):**

| Flag | Meaning |
|------|---------|
| `-z` | String is empty |
| `-e` | File exists |
| `-w` | File exists and is writable |
| `-eq`| Numeric equality |
| `-gt`| Greater than |
| `-lt`| Less than |
| `-le`| Less than or equal |
| `=`  | String equality |

**if / else if / else:**

```bash
if [ $1 -gt 10 ]; then
    echo "greater than ten"
elif [ $1 -lt 10 ]; then
    echo "less than 10"
else
    echo "equals 10"
fi
```

### case Statement

```bash
case $1 in
    "smile")
        echo ":)"
        ;;
    "sad")
        echo ":("
        ;;
    *)
        echo "I don't know"
        ;;
esac
```

### Loops & Arrays

```bash
friends=(Neel Meet Prem "Kanisha Patel")
echo "My second friend is ${friends[1]}"

for friend in ${friends[*]}; do
    echo "Friend: $friend"
done

echo "I have ${#friends[*]} friends"
```

**while loop example — number guessing game:**

```bash
NUM_TO_GUESS=$(( $RANDOM % 10 + 1 ))   # $(()) performs arithmetic
GUESSED_NUM=0

while [ $NUM_TO_GUESS -ne $GUESSED_NUM ]; do
    read -p "Your guess: " GUESSED_NUM
done

echo "You got it!"
```

---

## Cron

Cron lets you schedule scripts to run automatically.

### Method 1 — Cron Folders (Ubuntu only)

Drop an executable script into the appropriate directory:

```
/etc/cron.daily
/etc/cron.hourly
/etc/cron.weekly
/etc/cron.monthly
```

The script **must be executable** (`chmod +x`).

### Method 2 — crontab

```bash
crontab -e              # edit your crontab
crontab -u ubuntu -e    # edit another user's crontab
```

**Crontab syntax:**

```
* * * * * /path/to/script.sh
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

Use [crontab.guru](https://crontab.guru) to build and verify cron expressions.

---

## Customizing Your Shell

`PS1` is the environment variable that controls your shell prompt appearance.

```bash
# Example: green username in prompt
PS1="\e[32m\u\e[0m:\w\$ "
```

- `\e[32m` — sets text color to green
- `\u` — current username
- `\w` — current working directory

**Resources:**
- [awesome-bash](https://github.com/awesome-lists/awesome-bash) — curated list of bash resources
- [Symbolic Links in Linux](https://linuxize.com/post/how-to-create-symbolic-links-in-linux-using-the-ln-command/)
