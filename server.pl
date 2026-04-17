use strict;
use warnings;
use Socket;
use POSIX qw(strftime);

my $port = 8080;
my $docroot = $ENV{PWD} || ".";

my %mime = (
    'html' => 'text/html',
    'css'  => 'text/css',
    'js'   => 'application/javascript',
    'json' => 'application/json',
    'png'  => 'image/png',
    'jpg'  => 'image/jpeg',
    'svg'  => 'image/svg+xml',
    'ico'  => 'image/x-icon',
    'woff' => 'font/woff',
    'woff2'=> 'font/woff2',
    'ttf'  => 'font/ttf',
);

socket(my $server, PF_INET, SOCK_STREAM, getprotobyname('tcp')) or die "socket: $!";
setsockopt($server, SOL_SOCKET, SO_REUSEADDR, 1) or die "setsockopt: $!";
bind($server, sockaddr_in($port, INADDR_ANY)) or die "bind: $!";
listen($server, 5) or die "listen: $!";
print "Serving on http://localhost:$port\n";

while (accept(my $client, $server)) {
    my $request = '';
    while (my $line = <$client>) {
        $request .= $line;
        last if $line eq "\r\n";
    }
    my ($method, $path) = $request =~ /^(\w+)\s+(\S+)/;
    $path //= '/';
    $path =~ s/\?.*//;
    $path .= 'index.html' if $path =~ /\/$/;

    my $file = "$docroot$path";
    if (-f $file) {
        open my $fh, '<:raw', $file or next;
        my $data = do { local $/; <$fh> };
        close $fh;
        my ($ext) = $file =~ /\.(\w+)$/;
        my $type = $mime{$ext // ''} // 'application/octet-stream';
        print $client "HTTP/1.1 200 OK\r\nContent-Type: $type\r\nContent-Length: " . length($data) . "\r\nConnection: close\r\n\r\n$data";
    } else {
        my $msg = "404 Not Found";
        print $client "HTTP/1.1 404 Not Found\r\nContent-Length: " . length($msg) . "\r\nConnection: close\r\n\r\n$msg";
    }
    close $client;
}
