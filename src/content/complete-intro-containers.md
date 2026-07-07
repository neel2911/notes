> **Course:** Complete Intro to Containers, V2 · **Instructor:** Brian Holt · **Platform:** Frontend Masters (master.dev)

---

## At a Glance

Containers bundle your app and its environment into a portable, isolated unit — the same code runs identically on a laptop, CI server, or production cloud. Under the hood, containers are not magic: they are three Linux kernel features composed together.

```
chroot (filesystem isolation)
  + namespaces (process/network/user isolation)
  + cgroups (CPU/memory limits)
= container
```

---

## Table of Contents

1. [Why Containers?](#1-why-containers)
2. [Linux Primitives](#2-linux-primitives)
3. [Docker Basics](#3-docker-basics)
4. [Dockerfiles](#4-dockerfiles)
5. [Multistage Builds](#5-multistage-builds)
6. [Distroless Containers](#6-distroless-containers)
7. [Bind Mounts & Volumes](#7-bind-mounts--volumes)
8. [Dev Containers](#8-dev-containers)
9. [Networking](#9-networking)
10. [Docker Compose](#10-docker-compose)
11. [Kubernetes](#11-kubernetes)
12. [Alternatives](#12-alternatives)
13. [Quick Reference](#13-quick-reference)
14. [Active Recall Questions](#14-active-recall-questions)

---

## 1. Why Containers?

The history of deployment shows a progression toward better isolation and resource efficiency:

| Era | Approach | Problem |
|---|---|---|
| Bare metal | One app per physical server | Expensive, slow to provision |
| Virtual machines | Multiple OS instances on one machine | Heavy — each VM carries a full OS kernel |
| Public cloud | Rented VMs on demand | Still heavyweight; boot time in minutes |
| **Containers** | Shared kernel, isolated user-space | Lightweight, start in milliseconds |

Containers sit one layer above VMs: they share the host OS kernel but isolate everything above it (filesystem, processes, network, users, resource limits).

---

## 2. Linux Primitives

Containers are built from three Linux kernel features. You can construct a container manually using only these tools — Docker is a convenient wrapper around them.

### chroot — Filesystem Isolation ("Linux Jail")

`chroot` (change root) restricts a process so it can only see a specific directory tree. The process believes that directory is `/` — it cannot navigate above it or access anything outside.

```bash
# Inside an Ubuntu container, copy a binary + its libs, then jail a process
ldd /bin/cat                   # list shared library dependencies
cp <lib paths> <dest dir>      # copy libs to the new root
cp /bin/cat <dest dir>/bin/
chroot <dest dir> /bin/cat     # run cat jailed inside <dest dir>
```

**Key concept:** jailing a process restricts its filesystem view but does NOT isolate processes, network, or resource usage — that is what namespaces and cgroups add.

### Namespaces — Process & Resource Isolation

Namespaces prevent containers from seeing each other's processes, network interfaces, users, and more. Without namespaces, every process inside a container could see (and signal) every process on the host.

Linux namespace types:

| Namespace | Isolates |
|---|---|
| `pid` | Process IDs — container gets its own PID 1 |
| `net` | Network interfaces, routing tables |
| `mnt` | Mount points / filesystem |
| `uts` | Hostname and domain name |
| `ipc` | Inter-process communication |
| `user` | User and group IDs |

`unshare` is the low-level tool that creates namespaces without Docker.

### cgroups — Resource Limits

Control groups (cgroups) are a Linux kernel feature for limiting and accounting for the computing resources (CPU, RAM, disk I/O) that a process group can use.

```bash
grep -c cgroup /proc/mounts           # confirm cgroups are mounted

# Assign a process to a cgroup
echo <PID> > /sys/fs/cgroup/<cgroup_name>/cgroup.procs
```

**Important rules:**
- One process can only belong to **one** cgroup at a time.
- `cgroup.subtree_control` — controls which resources (cpu, memory, io) are available to child cgroups.
- cgroups live in `/sys/fs/cgroup/`.
- CPU quota example: `5000` out of `100000` = **5% of one CPU core**.

### Running a Container Without Docker

```bash
# The three primitives together:
chroot   # filesystem isolation
unshare  # namespace isolation
cgroups  # resource limits
```

---

## 3. Docker Basics

### Starting a Container

```bash
docker run -it --name docker-host --rm --privileged ubuntu:jammy
```

| Flag | Meaning |
|---|---|
| `-i` / `--interactive` | Keep STDIN open |
| `-t` / `--tty` | Allocate a pseudo-terminal |
| `-it` | Combined: interactive shell |
| `-d` / `--detach` | Run container in background |
| `-dit` | Detached + interactive + tty (connect later) |
| `--name <name>` | Give the container a name |
| `--rm` | Auto-remove container on exit (prevents accumulation) |
| `--privileged` | Grant root-level access to host devices |
| `ubuntu:jammy` | `image:tag` — distribution and version |

```bash
# Check which OS and version you are running inside a container
cat /etc/issue
```

### Connecting to a Running Container

```bash
docker run vs docker exec vs docker attach
```

| Command | Behavior |
|---|---|
| `docker run` | Spins up a **new** container instance |
| `docker exec -it <name> bash` | Connects to existing container — **new** process |
| `docker attach <name>` | Connects to existing container — **same** running process |

```bash
# Connect a second terminal to an already-running container
docker exec -it docker-host bash
```

### Image vs Container

| Concept | Analogy |
|---|---|
| Docker **image** | Class — a reusable blueprint |
| Docker **container** | Instance — a running copy of the image |

**Docker Hub** is the public registry for images — analogous to npm for packages.

### Useful Container Commands

```bash
docker pull node:20          # download image to local cache without running
docker pause <name>          # suspend a running container
docker unpause <name>        # resume a paused container
docker kill <name>           # forcefully stop a container
docker export <name>         # dump container filesystem to a tar file
docker ps                    # list running containers
docker ps -a                 # list all containers including stopped ones
docker images                # list locally cached images
docker rmi <image>           # remove a local image
```

### Image Variants

```bash
docker run -it --rm node:20         # full Debian-based image
docker run -it --rm node:20-slim    # trimmed Debian
docker run -it --rm node:20-alpine  # Alpine Linux (smallest, ~5MB base)
```

| Variant | Use for |
|---|---|
| Full (Debian) | Development — has build tools, debuggers |
| Slim | Smaller prod image, still Debian |
| Alpine | Minimal production — use `apk` not `apt` |

---

## 4. Dockerfiles

A `Dockerfile` is a declarative manifest that defines how to build a container image. Each instruction creates a new image layer, and Docker caches layers — so put things that change least (dependencies) before things that change most (source code).

### Minimal Example

```dockerfile
FROM node:20
CMD ["node", "-e", "console.log('hi')"]
```

```bash
docker build -t my-app .        # build image tagged "my-app"
docker run --rm my-app          # run it
```

### Production-Ready Node Dockerfile

```dockerfile
FROM node:20

# Switch to the built-in non-root user before any instructions
USER node

# Set working directory (created if it doesn't exist)
WORKDIR /home/node/code

# Copy dependency manifests first — maximises layer cache reuse
COPY --chown=node:node package-lock.json package.json ./

# npm ci follows package-lock.json strictly, verifies checksums,
# and fails on any inconsistency — unlike npm install
RUN npm ci

# Copy the rest of the source code
COPY --chown=node:node . .

CMD ["node", "index.js"]
```

### Key Dockerfile Instructions

| Instruction | Purpose |
|---|---|
| `FROM <image>` | Base image to build on |
| `USER <user>` | Switch to a non-root user (security best practice) |
| `WORKDIR <path>` | Set working directory (creates it if absent) |
| `COPY [--chown=user:group] <src> <dest>` | Copy files from build context into image |
| `RUN <cmd>` | Execute a shell command during build |
| `CMD ["exec", "arg"]` | Default command when container starts |
| `EXPOSE <port>` | Document which port the app listens on |
| `ENV KEY=value` | Set environment variable |
| `ARG KEY=value` | Build-time variable (not available at runtime) |

### Port Mapping

```bash
# -p <host_port>:<container_port>
docker run -p 3000:3000 --rm --init my-app
```

`--init` wraps your process with a proper PID 1 init process, which correctly handles signals (important for graceful shutdown).

### .dockerignore

Prevent unnecessary files from being sent to the build context (speeds up builds and avoids accidentally including secrets):

```
.git/
node_modules/
.env
*.log
dist/
```

### Creating Users in Alpine

Alpine does not have `useradd` — use `adduser`/`addgroup` instead:

```dockerfile
RUN addgroup -S node && adduser -S node -G node
```

In Debian-based images:

```dockerfile
RUN useradd -ms /bin/bash myuser
```

---

## 5. Multistage Builds

Multistage builds let you use a full-featured image to build your app and then copy only the artifacts into a minimal final image. Intermediate stages are discarded — the final image contains only what is in the last `FROM` block.

```dockerfile
# ── Stage 1: build ──────────────────────────────────────────
FROM node:20 AS node-builder

RUN mkdir /build
WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .
# (run your build step here if needed, e.g. RUN npm run build)

# ── Stage 2: production ──────────────────────────────────────
FROM alpine:3.19

RUN apk add --update nodejs

RUN addgroup -S node && adduser -S node -G node
USER node

RUN mkdir /home/node/code
WORKDIR /home/node/code

# Copy only the built output from the previous stage
COPY --from=node-builder --chown=node:node /build .

CMD ["node", "index.js"]
```

**Why this matters:** the final image has no compiler, no npm, no build toolchain — dramatically smaller attack surface and image size.

---

## 6. Distroless Containers

"Distroless" images (e.g., `gcr.io/distroless/nodejs20-debian12`) are not literally distroless — they start from a minimal Debian base and strip out everything except what is needed to run a specific runtime (e.g., Node.js). The result:

- No shell (`/bin/sh` does not exist)
- No package manager
- No coreutils
- Only the runtime and its dependencies

**Trade-off:** much smaller, harder to exploit, but also harder to debug (no shell to exec into).

---

## 7. Bind Mounts & Volumes

### Bind Mounts

A bind mount creates a live link between a directory on the **host** and a path inside the container. Changes on either side are immediately visible to the other — no rebuild required.

```bash
docker run \
  --mount type=bind,source="$(pwd)"/dist,target=/usr/share/nginx/html \
  -p 8080:80 \
  --rm \
  --init \
  nginx:latest
```

**Use case:** serving local build output during development; hot reloading.

### Volumes

A Docker volume is managed storage that persists beyond the lifetime of any single container and can be shared across multiple containers. Unlike bind mounts, Docker manages where the data lives on disk.

```bash
# Create a named volume and mount it
docker run \
  --rm \
  --env DATA_PATH=/data/num.txt \
  --mount type=volume,src=incrementor-data,target=/data \
  incrementor
```

**Use case:** databases, uploaded files, any state that must survive container restarts.

| | Bind Mount | Volume |
|---|---|---|
| Managed by | You (host path) | Docker |
| Persists after container exits | Yes (it is just a host folder) | Yes |
| Shareable across containers | Yes | Yes |
| Good for | Dev hot-reload, static files | Databases, persistent app state |

---

## 8. Dev Containers

Dev containers let a whole team run a project locally inside Docker without installing anything on their host machines. The `.devcontainer/devcontainer.json` file describes the container, VS Code extensions, port forwards, and setup scripts.

**Supported editors/platforms:**
- VS Code (built-in, most mature)
- Visual Studio
- IntelliJ / JetBrains
- GitHub Codespaces
- CLI (`devcontainer` npm package)

**Benefits:**
- Onboarding goes from days to minutes
- "Works on my machine" becomes "works in the container"
- One project can have multiple devcontainer configurations

---

## 9. Networking

By default Docker creates three networks:

| Network | Driver | Purpose |
|---|---|---|
| `bridge` | bridge | Default; containers communicate by IP |
| `host` | host | Container shares host network stack |
| `none` | null | No network access |

```bash
docker network ls                                   # list networks
docker network create --driver bridge my-network    # create a custom network
docker run --network my-network my-app              # attach container to network
```

On a custom bridge network, containers can reach each other **by container name** (Docker provides internal DNS). On the default bridge network they can only reach each other by IP.

```bash
--env KEY=value    # pass environment variables into a container
```

---

## 10. Docker Compose

Docker Compose is the go-to tool for **local multi-container development**. It defines all services, networks, and volumes in a single YAML file that can be committed to source control.

**Rule of thumb:** use Compose for ≤5 container types with simple networking. Move to Kubernetes when you need scaling, complex networking, or production orchestration.

```bash
docker compose up --build    # build images and start all services (v2, space)
docker-compose up --build    # v1 (hyphen) — legacy
docker compose up --scale web=10
docker compose down          # stop and remove containers, networks
```

### Example `docker-compose.yaml`

```yaml
services:
  api:
    build: api
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      MONGO_CONNECTION_STRING: mongodb://db:27017
    labels:
      kompose.service.type: nodeport
      kompose.image-pull-policy: Never

  db:
    image: mongo:7
    ports:
      - "27017:27017"

  web:
    build: web
    depends_on:
      - api
    environment:
      API_URL: http://api:8080
    ports:
      - "8081:80"
    labels:
      kompose.service.type: LoadBalancer
      kompose.service.expose: "true"
      kompose.image-pull-policy: Never
```

**Key directives:**

| Directive | Purpose |
|---|---|
| `depends_on` | Controls startup order — service waits for its dependencies |
| `environment` | Inject environment variables |
| `links` | Legacy; prefer `depends_on` + shared network instead |

Docker Compose automatically creates and manages a shared network so services can reach each other **by service name** (e.g., `api` can connect to `db:27017`).

---

## 11. Kubernetes

Use Kubernetes (k8s) when you need:
- Production-grade container orchestration
- Horizontal scaling (scale to zero, scale to thousands)
- Complex multi-service networking and service discovery
- More than ~5 container types in a deployment

### Core Concepts

| Term | Description |
|---|---|
| Control plane | Brain of the cluster — schedules workloads, stores state (etcd) |
| Node | Worker machine — runs one or more pods |
| Pod | Smallest deployable unit — one or more tightly coupled containers |
| Service | Stable network endpoint in front of a set of pods |
| Deployment | Desired-state spec for pods — handles rollouts and restarts |

```
Deployment
  └── Service (frontend / backend group)
        └── Pod (group of related containers)
              └── Node (worker machine)
```

### kubectl — CLI Client

`kubectl` is the CLI that talks to any Kubernetes cluster (AWS EKS, Azure AKS, Google GKE, or local minikube):

```bash
kubectl apply -f "*.yaml"          # apply all config files
kubectl get all                    # list all resources
kubectl cluster-info               # show cluster endpoints
kubectl scale --replicas=5 deployment/api
kubectl delete all --all           # tear everything down
```

### kompose — Compose → k8s

`kompose` converts a `docker-compose.yaml` into Kubernetes manifests:

```bash
kompose convert
```

For each service it generates:
- A **Deployment** (how to run the service)
- A **Service** (how to expose it inside/outside the cluster)

**`kompose.image-pull-policy: Never`** — tells Kubernetes not to pull the image from a remote registry. Essential when working with locally built images.

**`depends_on`** — helps kompose understand startup order when generating k8s configs.

### Managed Kubernetes Providers

| Provider | Service |
|---|---|
| Microsoft Azure | AKS (Azure Kubernetes Service) |
| Amazon AWS | EKS (Elastic Kubernetes Service) |
| Google Cloud | GKE (Google Kubernetes Engine) |

---

## 12. Alternatives

### Container Builders (alternatives to Docker build)

| Tool | Notes |
|---|---|
| **Buildah** | Daemon-less OCI image builder, fine-grained layer control |

### Container Runtimes (alternatives to Docker)

| Tool | Notes |
|---|---|
| **Podman** | Daemon-less, rootless drop-in Docker replacement |
| **Colima** | Container runtime for macOS using Lima VMs |
| **gVisor** | Google's sandboxed runtime — extra security layer between container and kernel |
| **Kata Containers** | Hardware-virtualized containers — each container gets its own lightweight VM kernel |

### Orchestration Alternatives (alternatives to Kubernetes)

| Tool | Notes |
|---|---|
| **Docker Swarm** | Built into Docker; simple but less capable than k8s |
| **Apache Mesos** | Older; used at large scale (Twitter, Airbnb) |
| **OpenShift** | Red Hat's enterprise k8s distribution |
| **Rancher** | Multi-cluster Kubernetes management platform |
| **HashiCorp Nomad** | Lightweight orchestrator; handles containers and non-container workloads |

**Hetzner** — affordable European cloud VM provider; commonly used to spin up and down VMs for container workloads.

---

## 13. Quick Reference

### docker run flags

```bash
docker run \
  -it \                              # interactive terminal
  -d \                               # detached (background)
  --rm \                             # auto-remove on exit
  --init \                           # proper PID 1 / signal handling
  --name my-container \              # give it a name
  --privileged \                     # full root access to host
  -p 8080:80 \                       # host:container port mapping
  --env KEY=value \                  # environment variable
  --mount type=bind,source=...,target=... \
  --mount type=volume,src=...,target=... \
  --network my-network \
  image:tag
```

### Dockerfile cheat-sheet

```dockerfile
FROM node:20                                    # base image
USER node                                       # run as non-root
WORKDIR /home/node/code                         # working directory
COPY --chown=node:node package*.json ./         # copy with ownership
RUN npm ci                                      # install (strict)
COPY --chown=node:node . .                      # copy source
EXPOSE 3000                                     # document port
ENV NODE_ENV=production                         # env var
CMD ["node", "index.js"]                        # default entrypoint
```

### npm ci vs npm install

| | `npm ci` | `npm install` |
|---|---|---|
| Follows `package-lock.json` | Strictly | Loosely |
| Verifies checksums | Yes | No |
| Fails on inconsistency | Yes | No |
| Speed | Faster (no resolution) | Slower |
| Use in | CI / Docker builds | Local development |

### Docker Scout (security scanning)

```bash
docker scout quickview alpine:3.19.1   # summary of vulnerabilities
docker scout cves alpine:3.19.1        # detailed CVE list
```

---

## 14. Active Recall Questions

<details>
<summary>What three Linux kernel features combine to make a container?</summary>

**chroot** (filesystem isolation), **namespaces** (process/network/user isolation), and **cgroups** (CPU/memory resource limits).
</details>

<details>
<summary>What is the difference between docker run, docker exec, and docker attach?</summary>

- `docker run` — creates and starts a **new** container.
- `docker exec -it <name> bash` — opens a **new** process inside an **existing** container.
- `docker attach <name>` — connects to the **existing main process** of a running container.
</details>

<details>
<summary>Why should you copy package.json before your source code in a Dockerfile?</summary>

Docker caches each layer. `npm ci` only re-runs when `package*.json` changes. If you copied source code first, every code change would invalidate the dependency install layer and force a full `npm ci` on every build.
</details>

<details>
<summary>What is a multistage build and why does it matter?</summary>

A multistage build uses multiple `FROM` statements. Earlier stages (with build tools, compilers, etc.) are discarded; only the final stage makes it into the image. Result: smaller, more secure production images with no build toolchain included.
</details>

<details>
<summary>What is the difference between a bind mount and a Docker volume?</summary>

A **bind mount** maps a specific host directory into the container — you control the path. A **volume** is Docker-managed storage that persists beyond container lifetime and can be shared across containers. Bind mounts are ideal for dev hot-reload; volumes are ideal for database data.
</details>

<details>
<summary>When should you use Docker Compose vs Kubernetes?</summary>

Use **Docker Compose** for local development with ≤5 simple services. Use **Kubernetes** for production workloads requiring auto-scaling, complex service discovery, rolling updates, or more than ~5 container types.
</details>

<details>
<summary>What does --init do when running a container?</summary>

It injects a minimal init process as PID 1. This ensures signals (SIGTERM, SIGINT) are properly forwarded to your app and zombie processes are reaped — critical for graceful container shutdown.
</details>
