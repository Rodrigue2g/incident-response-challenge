#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

__attribute__((noinline))
static void win(void) {
    puts("\n\033[1;92m[ OK ] Emergency maintenance console unlocked.\033[0m");
    puts("\033[96mRun `cleanup` to terminate all active sessions and secure the system.\033[0m");
    setenv("TERM", "xterm-256color", 1);
    setenv(
        "PS1",
        "\033[1;96mcitadelle\033[0m@\033[1;93memergency-maintenance\033[0m:"
        "\033[1;94m\\w\033[0m\\$ ",
        1
    );
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
