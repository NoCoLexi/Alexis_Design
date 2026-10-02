"""Issuer profiles. Direct work is issued by UpStart-Labs. Work billed through
the subcontractor (Vivid GovTech) is issued by Sikich."""
PROFILES = {
    "upstart": dict(
        issuer="UpStart-Labs",
        title="UpStart-Labs time tracking",
        tag="Issued by UpStart-Labs  |  Billed direct to Sikich  |  Consultant: Alexis Brochu",
        file_prefix="UpStart-Labs",
        serif="Newsreader", sans="DM Sans", mono="DM Mono",
        page="F7F6F2", band="ECE9E1", soft="E3E0D8", ink="191918", muted="5F5D57",
        line="D2CFC6", accent="F45122", emph="C8380E", input="FFFFFF",
        head_fill="191918", head_text="F7F6F2", title_fill=None, title_text="191918",
    ),
    "sikich": dict(
        issuer="Sikich",
        title="Sikich | CDPHE FSS project: time tracking",
        tag="Issued by Sikich  |  Subcontractor: Vivid GovTech  |  Consultant: Alexis Brochu",
        file_prefix="Sikich",
        serif="Arial", sans="Arial", mono="Arial",
        page="FFFFFF", band="E0F4F4", soft="E0F4F4", ink="1A1A1A", muted="444444",
        line="B8D8D8", accent="007B7F", emph="007B7F", input="FFFDE7",
        head_fill="007B7F", head_text="FFFFFF", title_fill="007B7F", title_text="FFFFFF",
    ),
}
