//
//	EJBindingWebSocket.m
//	Ejecta
//
//	Created by Michael Rhodes on 8/01/13.
//

#import "EJBindingWebSocket.h"

@implementation EJBindingWebSocket

#pragma mark - EJBindingEventedBase

- (id)initWithContext:(JSContextRef)ctxp object:(JSObjectRef)obj argc:(size_t)argc argv:(const JSValueRef [])argv {
	if (self = [super initWithContext:ctxp object:obj argc:argc argv:argv]) {
		if( argc > 0 ) {
			NSURL * url = [NSURL URLWithString: JSValueToNSString(ctxp, argv[0])];
			NSURLRequest * request = [NSURLRequest requestWithURL:url];
			socket = [[SRWebSocket alloc] initWithURLRequest:request];
			socket.delegate = self;
			[socket open];
		}
	}
	return self;
}

- (void) dealloc {
	[socket release];
	[super dealloc];
}

#pragma mark - SRWebSocketDelegate

- (void)webSocketDidOpen:(SRWebSocket *)webSocket;
{
	[self triggerEvent:@"open" argc:0 argv:NULL];		
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error;
{
	[self triggerEvent:@"error" argc:1 argv:(JSValueRef[]){ NSStringToJSValue([EJApp instance].jsGlobalContext, [error localizedDescription]) }];
	socket = nil;
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
{
	[self triggerEvent:@"message" argc:1 argv:(JSValueRef[]){ NSStringToJSValue([EJApp instance].jsGlobalContext, message) }];
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean;
{
	[self triggerEvent:@"close" argc:0 argv:NULL];	
	socket = nil;
}

#pragma mark - EJ_BIND_FUNCTION

EJ_BIND_FUNCTION(open, ctx, argc, argv) {
	[socket open];
	return NULL;
}

EJ_BIND_FUNCTION(send, ctx, argc, argv) {
	if( argc > 0 ) {
		[socket send: JSValueToNSString(ctx, argv[0])];
	}
	return NULL;
}

EJ_BIND_FUNCTION(close, ctx, argc, argv) {
	[socket close];
	return NULL;
}

@end