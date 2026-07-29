#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

__attribute__((noinline))
static void win(void) {
    puts("\nEmergency maintenance console unlocked.");
    puts("Run `cleanup` to terminate all active sessions and secure the system.");
    execl("/bin/sh", "sh", "-i", NULL);
    _exit(1);
}

__attribute__((noinline))
static void handle_request(void) {
    char auth_code[64];
    puts("Citadelle Emergency Maintenance Daemon v1.2");
    puts("Enter authorization code:");
    /*
     * Deliberate classroom vulnerability: the read size exceeds the destination
     * buffer. This process runs inside a restricted, disposable container.
     */
    read(STDIN_FILENO, auth_code, 512);
    printf("Code received: %.64s\n", auth_code);
}

int main(void) {
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
    printf("Privileged cleanup handler loaded at: %p\n", (void *)win);
    handle_request();
    return 0;
}
