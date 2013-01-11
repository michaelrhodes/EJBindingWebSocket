//
//	EJBindingWebSocket.h
//	Ejecta
//
//	Created by Michael Rhodes on 8/01/13.
//

#import "EJBindingEventedBase.h"
#import "SRWebSocket.h"

@interface EJBindingWebSocket : EJBindingEventedBase <SRWebSocketDelegate> {
		SRWebSocket * socket;
}

@end
