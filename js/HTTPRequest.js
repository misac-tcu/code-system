function getResource(URL, ResourceName, Parameter, FHIRResponseType, AfterFun) {
    //The complete URL to request data from FHIR Server
    var url = URL + ResourceName + Parameter;
    //Using XMLHttpRequest component to interact with the server
    var xhttp = new XMLHttpRequest();
    /*
        xhttp.open(method, url, async)
        @desc： Initialize components
        @param： 
            method： Using HTTP "GET" method
            url： Request path
            async： synchronously(false) or asynchronously(true)
    */
    xhttp.open("GET", url, false);
    /*
        xhttp.setRequestHeader(header, value)
        @desc： Set the value of the HTTP header
        @param：
            header： Header name
            value： Header value
    */
    xhttp.setRequestHeader("Content-type", 'text/' + FHIRResponseType);
    /*
        xhttp.onreadystatechange = callback;
        @desc：Stores a function to be called automatically each time the readyState property changes
    */
    xhttp.onreadystatechange = function () {
        /*
            this.readyState
            @desc： Return the current status of the XMLHttpRequest
            @value：
                0: request not initialized
                1: server connection established
                2: request received (can obtained header & status)
                3: processing request
                4: request finished and response is ready
        */
        /*
            this.status
            @desc：HTTP status messages that might be returned
            @value：
                0：UNSENT or OPENED
                200：LOADING or DONE
                403:FORBIDDEN
                404:PAGE NOT FOUND
        */
        if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
            var str = this.response;
            /*
                eval(string)
                @desc： Convert string to JavaScript function code for execution
            */
            if (AfterFun != '') {
                eval(AfterFun)(str);
            }
            return str;
        }
        else if (this.readyState == 4 && (this.status != 200 || this.status != 201)) {
            retValue(JSON.parse(this.response));
        }
    };
    /*
        xhttp.send()
        @desc： Send a request to the specified server path
    */
    xhttp.send();
}