# Citadelle — Emergency Maintenance Daemon (pwn)

A classic ret2win binary for participants who find their way to the maintenance endpoint.

## The challenge

The daemon leaks the address of `win()` on startup, then reads up to 512 bytes into a 64-byte stack buffer. Stack canaries and PIE are disabled deliberately so the overflow is straightforward.

Connecting:

```bash
nc maintenance.citadelle.designo-group.com 31337
```

## Solve

```bash
pip install pwntools
python3 exploit.py HOST=maintenance.citadelle.designo-group.com
# or locally:
python3 exploit.py HOST=127.0.0.1 PORT=31337
```

The exploit parses the leaked address, pads to the return address (72 bytes), then redirects execution to `win+1` to keep the stack 16-byte aligned for `puts`.

## Running locally

```bash
docker build -f pwn/Dockerfile -t citadelle-pwn .
docker run --rm -p 31337:31337 citadelle-pwn
```

Or compile the binary directly (Linux x86-64):

```bash
cc -O0 -fno-stack-protector -fno-omit-frame-pointer -no-pie \
   -Wl,-z,norelro -o challenge pwn/challenge.c
socat TCP-LISTEN:31337,reuseaddr,fork EXEC:./challenge,pty,stderr,setsid,sigint,rawer
```

## What happens on success

A restricted shell opens. Running `cleanup` contacts the Citadelle incident-closure API and returns a URL participants can open to claim their completion report.

## Resources

- [pwntools documentation](https://docs.pwntools.com)
- [Buffer overflow — Medium](https://medium.com/@arjoldcoko/buffer-overflow-ba76e9c766a7)
- [Understanding buffer overflows: from fundamentals to real-world impact](https://medium.com/@ssenkrad14/understanding-buffer-overflows-from-fundamentals-to-real-world-impact-4e720b189e91)
- [Understanding stack and heap memory](https://towardsdev.com/understanding-stack-and-heap-memory-a96e90f9c982)
