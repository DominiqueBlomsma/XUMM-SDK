import {debug as Debug} from 'https://deno.land/x/debug/mod.ts'
import type {Meta} from './Meta.ts'

import type {
  xAppOttData
} from './types/index.ts'

import {JwtUserdata} from './JwtUserdata.ts'

import {throwIfError} from './utils.ts'

const log = Debug('xumm-sdk:xapp')

export class xApp {
  private Meta: Meta
  private userdata: JwtUserdata

  constructor (MetaObject: Meta) {
    log('Constructed')
    this.Meta = MetaObject
    // Backwards compatibility for old Sdk.xApp.userdata users
    // - as xApps used to be the only JWT issuing env. - PKCE now is as well
    this.userdata = new JwtUserdata(MetaObject)
  }

  public async get (ott: string): Promise<xAppOttData | null> {
    const call = await this.Meta.call<xAppOttData>('xapp/ott/' + ott, 'GET')

    throwIfError(call)

    return call
  }
}
