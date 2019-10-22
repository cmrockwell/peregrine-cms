package com.peregrine.sitemap.impl;

/*-
 * #%L
 * platform base - Core
 * %%
 * Copyright (C) 2017 headwire inc.
 * %%
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * #L%
 */

import com.peregrine.sitemap.Page;
import com.peregrine.sitemap.PageRecognizer;
import org.osgi.service.component.annotations.Component;

import static com.peregrine.commons.util.PerConstants.*;
import static com.peregrine.commons.util.PerUtil.isPropertyEqual;

@Component(service = PageRecognizer.class)
public final class PerPageRecognizerImpl implements PageRecognizer {

    public String getName() {
        return getClass().getName();
    }

    public boolean isPage(final Page candidate) {
        if(!isPropertyEqual(candidate, JCR_PRIMARY_TYPE, PAGE_PRIMARY_TYPE)) {
            return false;
        }

        if (!candidate.hasContent()) {
            return false;
        }

        if(!isPropertyEqual(candidate.getContent(), JCR_PRIMARY_TYPE, PAGE_CONTENT_TYPE)) {
            return false;
        }

        return candidate.containsProperty(SLING_RESOURCE_TYPE);
    }
}
