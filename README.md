Front end happy hour

Full stack fundamentals, v3
By Jem young - Netflix


Morden computing
UI, Server, Database

UI 
- browsers
- desktops
- car
- appliances
- mobile device

Server
- APIs
- logging
- authentication
- development platform

Databases
- Structured data storages
- Data analytics

What does it mean to be a full stack engineer?
An engineer who can create and manage frontend and backend of an application 
What is a stack?
1. UI
2. web server
3. database
4. operating system
5. application server 

React
NodeJs
Redis

Angular
Tomcat
MySql

Vue
Apache
Postgress

Terminal and command line

Most low level/fastest way to communicate to operating system

ls - list dictionary contents
cd - change directory
mkdir - make directory
rmdir - remove director

cat - show file contents
man - command manual
less - show file contents by page
touch - creates an empty file
rm - remove file
echo - repeat input


In case you get lost

cd - move up one directory
pwd - print working directory
clear - clear terminal output
cltr + c - exit program
cd ~ - navigate to home directory

VIM
has three modes

insert mode - text editing => i
normal mode - primary mode => esc
command mode - searching, saving, exiting => :

What is a Server?
- it serves a request



Operating systems

User

Shell

Kernel

Hardware

To connect server with ssh privet key
- ssh -i ~/.ssh/<privet key> user@ip

Command to add in keychain
- ssh-add --apple-use-keychain <key file>

TCP - transmission control protocol (most reliable connection)
UDP - user datagram protocol (fast communication mostly use for one way
transmission like video, audio streaming)
ICMP - internet control message protocol (e.g ping, nettrace)
Packet - unit of data transmitted over network


TCP/IP

DNS - Domain name system
Nameserver - hold DNS records to translate domain names into IP addresses
A record - maps name to IP address
Cname - maps name to name

nslookup - will provide all the domain ip mapping
nslookup domainname
e.g
nslookup google.com

URL - uniform resource locator

blog.yourdomain.com/en/fullstack?test=true


domain - yourdomain.com
subdomain - blog.yourdomain.com
tld - com
path - /en/fullstack
queryparam - test=true

1. Update software
apt update
apt upgrade

2. Restart you server
shutdown now -r

Root is the highest permission level.
It will not ask for comfirmation


sudo - super user do

1. Create a new user
adduser <your_username>

2. Add user to "sudo" group
usermode -aG sudo <your_username>

3. Switch user
su <your_username>

4. Check sudo access
sudo cat /var/log/auth.log

Enable login as new user
1. Create authorized_keys file
~/.ssh/authorized_keys
2. paste your public key
3. exit
4. login with new user


Security

1. Chagne file permission
chmod 644 ~/.ssh/authorized_keys
2. Disable root login
sudo vi /etc/ssh/sshd_config
3. Restart ssh daemon
sudo service ssh restart

sudo -i => go to root user 

Ngnix

it is an application sever written in C specialized for request routing.
it can route to database, another server, and application (e.g. nodejs)


Install nginx
sudo apt install nginx

start nginx
sudo service nginx start

view default nginx configuration
less /etc/nginx/sites-available/default

Link to newest node.js Source
curl https://deb.nodesource.com/setup_19.x | sudo -E bash -

install node
sudo apt-get install nodejs

install git
sudo apt install git

Change ownership of /www
sudo chown -R $USER:$USER /var/www

/etc/nginx/sites-enabled/<your config> - file for your custom proxy
/etc/nginx/ngnix.config - add proxy file in it without touching the actual config


Test github connection
ssh -vT git@github.com

Save a readonly file in vim
:w !sudo tee %

view permissions as numbers
stat -c %a <file_name>

stop a running propcess
pkill <process>


Security

Port - communication endpoint that maps to specific process or n/w service

see all know ports
less /etc/services

nmap <IP> = to check all the open ports

UFW - uncomplicated firewall

sudo ufw status
sudo ufw allow <port>
sudo ufw reject <port>
sudo ufw deny <port>
sudo ufw enable


Permissions

Application updates

install unattended upgrades
sudo apt install unattended-upgrates

Enable upgrades
sudo dpkg-reconfigure --priority=low
unattended-upgrades


Continuous integration - code changes are validated and merged back
into main branch as often as possible.

Continuous delivery - code changes are automatically built and ready
for production

Continuous development - Builds are automatically deployed to production
environments.

Spinneker - it is powerful tech for scaling the infra (e.g. servers, cloud)

var/log

syslog
auth.log
nginx/access.log


tail - output the last part of the file
head - output the first part of the file
less - output one page at time
cat - output entire file

tail -f

Standard streams

standard output
- stdout
standard input
- stdin
standard error
- stderr



Redirection

| (pipe) - read from stdout
> - write stdout to file
>> - append stdout to file
< - read from stdin
2>&1 - redirect both stderr and stdout 

find & grep

find - search file names
grep - search file contents


find /bar -name foo.txt
find <location> <option> <file/folder>

grep -i 'jem' /var/www
grep <option> <search expression> <dictionry>

Gzip
htmls are by default gzip

proxy_http_version 1.1;

Database

Websocket

multiple server can access one database

Non-relational DBs

redis
elastic
mongoDB
cassandra

Relational

mysql
Sqlite
PostgreSQL
Microsoft SQL

HTTP

request 


response

HTTPs

https://certbot.eff.org/instructions?ws=nginx&os=snap



HTTP/2

Containers

Microservices - Software archiecture of loosely connected services

Monolith - Software architecture of tightly coupled services

Big brands for containers

Docker
Amazon ECS
Apache Messos
CoreOS rkt

Lightweight
Portable
Easier for development
Easier to manage
Faster startup
Decouple application from infrastucture

Orchestration
Kubernetes "K8s"
Docker Swarm
Amazon EKS
Apache Mesos
AKS


Load Balancer
 - Scheduling Algorithms
    Round Robin
    IP Hashing
    Random Choice
    Least Connections
    Least Load

Display running processes
- htop# 🖥️ Full Stack Fundamentals v3 — Knowledge Base

> **Course:** Full Stack Fundamentals v3 · **Instructor:** Jem Young (Netflix) · **Platform:** Frontend Masters

---

## ⚡ At a Glance

Full stack engineering means owning the entire request lifecycle — from the UI a user clicks, through a web server that routes the request, down to the database that stores the data, and back.

```
UI Layer (React/Vue/Angular) → Server Layer (Nginx/Node.js) → Database Layer (PostgreSQL/Redis)
```

---

## 🗂️ Table of Contents

1. [What is a Full Stack Engineer?](#1-what-is-a-full-stack-engineer)
2. [Linux & The Terminal](#2-linux--the-terminal)
3. [Networking](#3-networking)
4. [Servers & Nginx](#4-servers--nginx)
5. [Security](#5-security)
6. [CI/CD & Logs](#6-cicd--logs)
7. [Databases](#7-databases)
8. [Architecture](#8-architecture)
9. [Key Takeaways](#9-key-takeaways)
10. [Quick Reference](#10-quick-reference)
11. [Active Recall Questions](#11-active-recall-questions)

---

## 1. What is a Full Stack Engineer?

A full stack engineer can build and manage **both** the frontend and backend of an application.

**The Stack:**

| Layer | Examples |
|---|---|
| UI (Frontend) | React, Vue, Angular |
| Web Server | Nginx, Apache |
| Application Server | Node.js, Tomcat |
| Database | PostgreSQL, MySQL, Redis |
| Operating System | Linux |

**Common stack combinations:**

| Frontend | Server | Database |
|---|---|---|
| React | Node.js | Redis |
| Angular | Tomcat | MySQL |
| Vue | Apache | PostgreSQL |

---

## 2. Linux & The Terminal

### What is the terminal?

The terminal is the lowest-level, fastest way to communicate with the OS. It bypasses the GUI and speaks directly to the kernel through a **shell** (bash).

**OS Layers:** `User → Shell → Kernel → Hardware`

### File System Commands

| Command | What it does |
|---|---|
| `ls` | List contents of current directory |
| `cd <dir>` | Change into a directory |
| `cd ..` | Move up one directory level |
| `cd ~` | Jump to home directory |
| `pwd` | Print current working directory |
| `mkdir <name>` | Create a new directory |
| `rmdir <name>` | Remove an empty directory |
| `touch <file>` | Create an empty file |
| `rm <file>` | Delete a file |
| `cat <file>` | Print full file contents |
| `less <file>` | View file one page at a time |
| `man <cmd>` | Open the manual for any command |
| `echo <text>` | Print text to the terminal |
| `clear` | Clear terminal output |
| `Ctrl + C` | Force-exit a running program |

### VIM — The Server Text Editor

VIM has three modes:

| Mode | How to enter | Purpose |
|---|---|---|
| Normal | `Esc` | Default / navigation |
| Insert | `i` | Type and edit text |
| Command | `:` | Save, quit, search |

**Key commands:**
- `:w` — Save
- `:q` — Quit
- `:wq` — Save and quit
- `:q!` — Force quit without saving
- `:w !sudo tee %` — Save a read-only file

> ⚠️ **Common trap:** Press `Esc` first before typing `:q` — you must be in Normal mode.

### User Management

> Root is the highest-permission user. **Never run production as root.**

| Step | Command | What it does |
|---|---|---|
| 1 | `adduser <username>` | Create a new user |
| 2 | `usermod -aG sudo <username>` | Add user to sudo group |
| 3 | `su <username>` | Switch to that user |
| 4 | `sudo -i` | Switch to root (use sparingly) |
| 5 | `sudo cat /var/log/auth.log` | Check auth/login history |

### Find & Search

| Command | Searches | Example |
|---|---|---|
| `find` | File **names** | `find /bar -name foo.txt` |
| `grep` | File **contents** | `grep -i 'term' /var/www` |

> 💡 Memory hook: **find** = names, **grep** = contents

### Process Management

| Command | What it does |
|---|---|
| `htop` | Interactive process viewer |
| `pkill <name>` | Kill a running process by name |

---

## 3. Networking

### Protocols

| Protocol | Full Name | Use Case |
|---|---|---|
| TCP | Transmission Control Protocol | Reliable, ordered delivery (web, email) |
| UDP | User Datagram Protocol | Fast, one-way (video/audio streaming) |
| ICMP | Internet Control Message Protocol | Diagnostics — ping, traceroute |

> 💡 **Analogy:** TCP = certified mail (you get a receipt). UDP = shouting across a room — fast, no guarantee they heard you.

**Packet** = the unit of data transmitted over a network.

### DNS — Domain Name System

DNS is the internet's phone book — it translates domain names into IP addresses.

| Concept | What it is |
|---|---|
| Nameserver | A server that holds DNS records |
| A Record | Maps domain name → IP address |
| CNAME | Maps domain name → another domain name (alias) |
| `nslookup <domain>` | CLI tool to look up the IP for any domain |

### Anatomy of a URL

```
blog.yourdomain.com/en/fullstack?test=true
```

| Part | Example | What it is |
|---|---|---|
| Domain | `yourdomain.com` | The base address you register |
| Subdomain | `blog.yourdomain.com` | Prefix — can point to different server |
| TLD | `.com` | Top-level domain |
| Path | `/en/fullstack` | The specific resource on the server |
| Query param | `?test=true` | Optional key-value data |

### SSH — Secure Shell

| Command | What it does |
|---|---|
| `ssh -i ~/.ssh/<key> user@ip` | Connect to server using a private key |
| `ssh-add --apple-use-keychain <key>` | Add key to macOS keychain |
| `ssh -vT git@github.com` | Test SSH connection to GitHub |

---

## 4. Servers & Nginx

### What is a Server?

A server is a program that **serves requests**. When your browser visits a website, it sends an HTTP request. The server receives it, processes it, and sends a response back.

```
Browser → Nginx (port 80/443) → Node.js app (port 3000) → Database
```

### Nginx — The Reverse Proxy

Nginx is a high-performance server written in C, used as a **reverse proxy**. It sits in front of your app and routes all HTTP requests to the right process.

| Command | What it does |
|---|---|
| `sudo apt install nginx` | Install Nginx |
| `sudo service nginx start` | Start the Nginx service |
| `less /etc/nginx/sites-available/default` | View default config |
| `/etc/nginx/sites-enabled/<config>` | Your custom proxy config |

> 💡 Key insight: Nginx receives all traffic on port 80/443, then forwards internally to your app. Your app port is never directly exposed to the internet.

### Installing Node.js

```bash
# 1. Add NodeSource
curl https://deb.nodesource.com/setup_19.x | sudo -E bash -

# 2. Install Node
sudo apt-get install nodejs

# 3. Install Git
sudo apt install git

# 4. Take ownership of web directory
sudo chown -R $USER:$USER /var/www
```

### Server Maintenance

| Command | What it does |
|---|---|
| `apt update && apt upgrade` | Update packages |
| `shutdown now -r` | Restart the server |
| `sudo apt install unattended-upgrades` | Install auto-update tool |
| `sudo dpkg-reconfigure --priority=low unattended-upgrades` | Enable auto-updates |

---

## 5. Security

### Security Layers (Defense in Depth)

1. **SSH key auth** — Key pairs instead of passwords. Passwords can be brute-forced; private keys cannot
2. **Disable root login** — Attackers always try root first. Remove that attack surface
3. **Firewall (UFW)** — Block all ports except what you explicitly need
4. **Auto-updates** — Most breaches exploit known, patched vulnerabilities

### File Permissions

`chmod` sets who can read, write, or execute a file.
- Format: `chmod [owner][group][others]`
- Values: 4 = read, 2 = write, 1 = execute

```bash
chmod 644 ~/.ssh/authorized_keys   # Owner: rw, Group: r, Others: r
stat -c %a <file>                  # View numeric permissions
```

### UFW — Uncomplicated Firewall

A **port** is a numbered endpoint mapping to a specific service (22=SSH, 80=HTTP, 443=HTTPS).

| Command | What it does |
|---|---|
| `sudo ufw status` | Show current firewall rules |
| `sudo ufw allow <port>` | Open a port |
| `sudo ufw deny <port>` | Block a port |
| `sudo ufw enable` | Activate the firewall |
| `nmap <IP>` | Scan open ports on a server |
| `less /etc/services` | List all well-known port numbers |

### SSH Hardening Steps

```bash
# 1. Set correct permissions
chmod 644 ~/.ssh/authorized_keys

# 2. Disable root login
sudo vi /etc/ssh/sshd_config
# Set: PermitRootLogin no

# 3. Restart SSH daemon
sudo service ssh restart
```

> ⚠️ Before disabling root login, verify your non-root sudo user can SSH in — or you'll lock yourself out.

---

## 6. CI/CD & Logs

### The Three CI/CD Stages

| Term | Stands for | What happens |
|---|---|---|
| CI | Continuous Integration | Every code change is auto-tested and merged to main |
| CD (Delivery) | Continuous Delivery | Code is auto-built and packaged — manual deploy |
| CD (Deployment) | Continuous Deployment | Builds are auto-deployed to production |

> 💡 **Spinnaker** is a popular tool for managing large-scale deployments across servers and cloud environments.

### Important Log Files

| Log file | Contains |
|---|---|
| `/var/log/syslog` | General system activity |
| `/var/log/auth.log` | Login attempts and auth events |
| `/var/log/nginx/access.log` | Every HTTP request that hit Nginx |

### Log Viewing Commands

| Command | What it does |
|---|---|
| `tail <file>` | Show last 10 lines |
| `tail -f <file>` | Live-stream new lines as they appear |
| `head <file>` | Show first 10 lines |
| `less <file>` | Page through file contents |
| `cat <file>` | Dump entire file to terminal |

### Standard Streams & Redirection

| Operator | Direction | Example |
|---|---|---|
| `\|` | Pipe stdout into next command | `cat file \| grep error` |
| `>` | Write stdout to file (overwrites) | `echo "hi" > out.txt` |
| `>>` | Append stdout to file | `echo "more" >> out.txt` |
| `<` | Read from file as stdin | `grep "foo" < input.txt` |
| `2>&1` | Redirect stderr to stdout | `cmd > all.log 2>&1` |

---

## 7. Databases

### Relational vs Non-Relational

| Type | Description | Examples |
|---|---|---|
| Relational (SQL) | Structured tables, schemas, foreign keys | MySQL, PostgreSQL, SQLite, MS SQL |
| Non-Relational (NoSQL) | Flexible schema, documents/key-value | Redis, MongoDB, Elasticsearch, Cassandra |

> 💡 Multiple servers can share one database — common pattern when scaling with a load balancer.

**Redis** = in-memory key-value store. All data in RAM → extremely fast reads/writes. Used for caching, sessions, leaderboards.

---

## 8. Architecture

### Monolith vs Microservices

| Architecture | Description | Trade-offs |
|---|---|---|
| Monolith | All features tightly coupled, deployed as one unit | Simple to start; hard to scale parts independently |
| Microservices | Loosely connected services, each with one responsibility | Independently deployable; more operational complexity |

### Containers

Containers package an app with all its dependencies — solving "works on my machine."

**Popular platforms:** Docker, Amazon ECS, Apache Mesos, CoreOS rkt

**Key benefits:**
- 🪶 Lightweight — shares the host OS kernel (unlike VMs)
- 📦 Portable — runs anywhere Docker is installed
- ⚡ Fast startup — seconds vs minutes for a VM
- 🔌 Decouples application from infrastructure

### Orchestration

When you have many containers, you need a system to manage, scale, and restart them.

**Popular tools:** Kubernetes (K8s), Docker Swarm, Amazon EKS, AKS, Apache Mesos

### Load Balancers

Distributes incoming traffic across multiple servers so no single server gets overwhelmed.

| Algorithm | How it works |
|---|---|
| Round Robin | Each server gets a request in turn, cyclically |
| IP Hashing | Same client IP always goes to same server (good for sessions) |
| Least Connections | Route to server with fewest active connections |
| Least Load | Route to server under least CPU/memory pressure |
| Random Choice | Picks a server at random |

### HTTPS & HTTP/2

- **HTTPS** — Encrypts traffic. Use [Certbot](https://certbot.eff.org) for a free SSL cert via Let's Encrypt
- **HTTP/2** — Multiple requests over a single connection simultaneously (faster than HTTP/1.1)
- **Gzip** — HTML responses are compressed by default in Nginx

---

## 9. Key Takeaways

- A full stack engineer builds and manages all three layers: UI, server, and database
- The terminal is the fastest path to the OS — every server task in production lives here
- Nginx acts as a reverse proxy — it routes all HTTP traffic to the right process
- Security is layered: SSH keys → disable root → firewall → auto-updates. Skip any layer = gap
- CI validates, Continuous Delivery prepares, Continuous Deployment ships automatically
- Containers solve "works on my machine" by bundling the app and its environment
- Load balancers distribute traffic — choose the right algorithm for your use case

---

## 10. Quick Reference

### Most-Used Commands

```bash
# Navigation
ls / cd <dir> / pwd / cd ~ / cd ..

# File operations
cat <file>        # Print file
less <file>       # Page through file
tail -f <file>    # Live log stream
grep -i 'term' /path   # Search file contents
find /dir -name file   # Search file names

# Permissions & security
chmod 644 <file>
sudo ufw allow 80
sudo ufw status
nmap <IP>

# Networking
nslookup domain.com
ssh -i ~/.ssh/key user@ip

# Process management
htop
pkill <name>

# Nginx
sudo service nginx start
tail -f /var/log/nginx/access.log
```

### Common Mistakes to Avoid

| ❌ Mistake | ✅ Fix |
|---|---|
| Running production as root | Always use a sudo-enabled user |
| Disabling root login before verifying sudo access | Test new user SSH login first |
| Forgetting to restart SSH daemon | `sudo service ssh restart` after every `sshd_config` change |
| Confusing `find` and `grep` | find=names, grep=contents |
| Using `>` when you meant `>>` | `>` overwrites, `>>` appends |
| Getting stuck in VIM | `Esc` → `:wq` → Enter |

---

## 11. Active Recall Questions

<details>
<summary>What does a full stack engineer do in one sentence?</summary>
Builds and manages both the frontend (UI) and backend (server + database) of a web application.
</details>

<details>
<summary>What are VIM's three modes and how do you enter each?</summary>
Normal (Esc) — navigation. Insert (i) — text editing. Command (:) — save, quit, search.
</details>

<details>
<summary>What is the difference between TCP and UDP?</summary>
TCP is reliable and ordered — confirms delivery (used for web). UDP is fast but unordered — no confirmation (used for streaming).
</details>

<details>
<summary>What does Nginx do in a typical Node.js deployment?</summary>
Nginx is a reverse proxy — receives all HTTP requests on port 80/443 and routes them to Node.js running internally (e.g. port 3000).
</details>

<details>
<summary>What does chmod 644 mean?</summary>
Owner: read+write (6=4+2). Group: read-only (4). Others: read-only (4). Correct for SSH authorized_keys.
</details>

<details>
<summary>What is the difference between > and >> in bash?</summary>
> overwrites the file. >> appends to the end without deleting existing content.
</details>

<details>
<summary>What's the difference between find and grep?</summary>
find searches by file name. grep searches file contents. find=names, grep=contents.
</details>

<details>
<summary>What are the three CI/CD stages?</summary>
CI: auto-test and merge. CD Delivery: auto-build, manual deploy. CD Deployment: auto-build AND auto-deploy to production.
</details>

<details>
<summary>What are the main advantages of containers?</summary>
Lightweight, portable, fast startup, isolated, decouples app from infrastructure — solves "works on my machine".
</details>

<details>
<summary>Name three load balancing algorithms and explain Round Robin.</summary>
Round Robin (cycle servers), IP Hashing (same client → same server), Least Connections (route to least busy). Round Robin: request 1→A, 2→B, 3→C, repeat.
</details>

---

*Notes from: Full Stack Fundamentals v3 by Jem Young · Frontend Masters*
